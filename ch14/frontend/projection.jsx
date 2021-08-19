import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { isAstObject, newAstObject, placeholderAstObject, setInMultipleValue, setSingleValue } from "../common/ast"
import { allOperators, requiresParentheses } from "../language/operators"
import { timeUnits } from "../language/time-units"
import { areEqual, builtInTypes, typeOf } from "../language/type-system"
import { AddNewButton, AstObjectUiWrapper } from "./support-components"
import { DropDownValue, NumberValue, TextValue } from "./value-components"


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.toLowerCase().match(/^[aeiou]/)) ? "n" : "")


const projectionExpressionFor = (astObject, propertyName, ancestors) => {
    const { settings } = astObject
    const value = settings[propertyName]
    return (value === undefined || value === placeholderAstObject)
        ? <DropDownValue
            editState={observable({
                setValue: (newValue) => {
                    settings[propertyName] = observable(newAstObject(newValue))
                }
            })}
            options={[
                "Attribute Reference",
                "Binary Operation",
                "Interval Operation",
                "Number",
                "Parentheses"
            ]}
            placeholderText={`<${propertyName}>`}
            actionText={`(choose concept for ${propertyName})`}
        />
        : <Projection value={value}
              ancestors={[ astObject, ...ancestors ]}
              setValue={setSingleValue(astObject, propertyName)}
        />
}


export const Projection = observer(({ value, setValue, ancestors }) => {    // FIXME back-propagate deleteValue -> setValue !!!
    if (isAstObject(value)) {

        const { settings } = value
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })

        const leftTransform = () => { setValue(newAstObject("Binary Operation", { "right operand": value })) }
        const rightTransform = () => { setValue(newAstObject("Binary Operation", { "left operand": value })) }

        const UiWrapped = ({ className, children, sideTransformable, showType }) => <AstObjectUiWrapper
                className={className}
                astObject={value} ancestors={ancestors} setValue={setValue}
                leftTransform={sideTransformable && leftTransform} rightTransform={sideTransformable && rightTransform}
                showType={showType}
            >
                {children}
            </AstObjectUiWrapper>

        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {

            case "Attribute": return <UiWrapped className="attribute">
                <span className="keyword whitespace-right">the</span>
                <TextValue editState={editStateFor("name")} placeholderText="<name>"/>
                <span className="keyword whitespace-both">is {indefiniteArticleFor(settings["type"])}</span>
                <DropDownValue
                    className="value enum-like whitespace-right"
                    editState={editStateFor("type")}
                    options={[ "amount", "boolean", "percentage", "period in days" ]}
                    placeholderText="<type>"
                />
                {settings["value"]
                    ? <div className="inline">
                        <DropDownValue
                            className="value keyword whitespace-right"
                            editState={editStateFor("value kind")}
                            options={[ "initially", "computed as" ]}
                        />
                        {projectionExpressionFor(value, "value", ancestors)}
                    </div>
                    : <AddNewButton buttonText="+ value" actionFunction={() => {
                        settings["value"] = placeholderAstObject
                        settings["value kind"] = "initially"
                    }} />
                }
            </UiWrapped>

            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <UiWrapped className="inline" showType>
                    <span className="keyword">the </span>
                    <DropDownValue
                        editState={observable({
                            value: settings["attribute"] && settings["attribute"].ref.settings["name"],
                            inEdit: false,
                            setValue: (newValue) => {
                                settings["attribute"] = {
                                    ref: attributes.find((attribute) => attribute.settings["name"] === newValue)
                                }
                            }
                        })}
                        className="reference"
                        options={attributes.map((attribute) => attribute.settings["name"])}
                        actionText="(choose an attribute to reference)"
                        placeholderText="<attribute>"
                    />
                </UiWrapped>
            }

            case "Binary Operation": {
                const hasVirtualParentheses = requiresParentheses(value, ancestors[0])
                return <UiWrapped className="inline" showType>
                    {hasVirtualParentheses && <span className="keyword">(</span>}
                    {projectionExpressionFor(value, "left operand", ancestors)}
                    <DropDownValue
                        className="value enum-like whitespace-both"
                        editState={editStateFor("operator")}
                        options={allOperators}
                        placeholderText="<operator>"
                    />
                    {projectionExpressionFor(value, "right operand", ancestors)}
                    {hasVirtualParentheses && <span className="keyword">)</span>}
                </UiWrapped>
            }

            case "Business Rule": {
                return <UiWrapped className="business-rule">
                    <div>
                        <span className="keyword whitespace-right">When</span>
                        {projectionExpressionFor(value, "condition", ancestors)}
                        <span className="keyword">,</span>
                    </div>
                    <div>
                        <span className="keyword whitespace-right">then</span>
                        <Projection
                            value={settings["consequence"]}
                            ancestors={[ value, ...ancestors ]}
                        />
                        <span className="keyword">.</span>
                    </div>
                </UiWrapped>
            }

            case "Increment Effect": {
                return <UiWrapped className="inline" showType>
                    <span className="keyword whitespace-right">add</span>
                    {projectionExpressionFor(value, "value", ancestors)}
                    <span className="keyword whitespace-both">to</span>
                    <Projection value={settings["attribute reference"]} ancestors={[ value, ...ancestors ]} />
                </UiWrapped>
            }

            case "Interval Operation": {
                return <UiWrapped className="inline" showType>
                    {projectionExpressionFor(value, "operand", ancestors)}
                    <DropDownValue
                        className="value enum-like whitespace-both"
                        editState={editStateFor("operator")}
                        options={[ "contains a", "starts in" ]}
                        placeholderText="<operator>"
                    />
                    <DropDownValue
                        className="value enum-like"
                        editState={editStateFor("time unit")}
                        options={timeUnits}
                        placeholderText="<time unit>"
                    />
                </UiWrapped>
            }

            case "Number": {
                const type = typeOf(value, ancestors)   // Listing 13.5
                return <UiWrapped className="inline" sideTransformable showType>
                    {areEqual(type, builtInTypes["amount"]) && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {areEqual(type, builtInTypes["percentage"]) && <span className="keyword">%</span>}
                    {areEqual(type, builtInTypes["period in days"]) && <span className="keyword whitespace-left">days</span>}
                </UiWrapped>
            }

            case "Parentheses": return <UiWrapped className="inline" sideTransformable showType>
                <span className="keyword">(</span>
                {projectionExpressionFor(value, "sub", ancestors)}
                <span className="keyword">)</span>
            </UiWrapped>

            case "Record Type": return <UiWrapped className="record-type">
                <div>
                    <span className="keyword whitespace-right">Record Type</span>
                    <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                </div>
                <div className="section">{/* TODO  back-propagate */}
                    <div><span className="keyword">attributes:</span></div>
                    {settings["attributes"].map((attribute, index) =>
                        <Projection value={attribute} key={index} ancestors={[ value, ...ancestors ]}
                            setValue={setInMultipleValue(value, "attributes", index)}
                        />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        settings["attributes"].push(newAstObject("Attribute"))
                    }} />
                </div>
                <div className="section">
                    <div><span className="keyword">business rules:</span></div>
                    {settings["business rules"].map((businessRule, index) =>
                        <Projection value={businessRule} key={index} ancestors={[ value, ...ancestors ]}
                            setValue={setInMultipleValue(value, "business rules", index)}
                        />
                    )}
                    <AddNewButton buttonText="+ business rule" actionFunction={() => {
                        settings["business rules"].push(
                            newAstObject("Business Rule", {
                                "consequence": newAstObject("Increment Effect", ({
                                    "attribute reference": newAstObject("Attribute Reference")
                                }))
                            })
                        )
                    }} />
                </div>
            </UiWrapped>

            default: return <div>
                <em>{"No projection defined for concept: " + value.concept}</em>
            </div>
        }

    }

    return <em>{"No projection defined for value: " + value}</em>
})

