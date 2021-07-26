import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { isAstObject, newAstObject, placeholderAstObject, setInMultipleValue, setSingleValue } from "../common/ast"
import { allOperators, requiresParentheses } from "../language/operators"
import { /* Exercise 13.10: */ areEqual, builtInTypes, typeOf } from "../language/type-system"
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

        const UiWrapped = ({ className, children, sideTransformable, /* Exercise 13.7: */showType }) => <AstObjectUiWrapper
                className={className}
                astObject={value} ancestors={ancestors} setValue={setValue}
                leftTransform={sideTransformable && leftTransform} rightTransform={sideTransformable && rightTransform}
                // Exercise 13.7:
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
                return <UiWrapped className="inline" /* Exercise 13.7: */showType>
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
                        className="data-reference"
                        options={attributes.map((attribute) => attribute.settings["name"])}
                        actionText="(choose an attribute to reference)"
                        placeholderText="<attribute>"
                    />
                </UiWrapped>
            }

            case "Binary Operation": {
                const hasVirtualParentheses = requiresParentheses(value, ancestors[0])
                return <UiWrapped className="inline" /* Exercise 13.7: */showType>
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

            case "Number": {
                const type = typeOf(value, ancestors)   // Listing 13.5
                return <UiWrapped className="inline" sideTransformable /* Exercise 13.7: */showType>
                    {/* Exercise 13.10: */areEqual(type, builtInTypes["amount"]) && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {/* Exercise 13.10: */areEqual(type, builtInTypes["percentage"]) && <span className="keyword">%</span>}
                    {/* Exercise 13.10: */areEqual(type, builtInTypes["period in days"]) && <span className="keyword whitespace-left">days</span>}
                </UiWrapped>
            }

            case "Parentheses": return <UiWrapped className="inline" sideTransformable /* Exercise 13.7: */showType>
                <span className="keyword">(</span>
                {projectionExpressionFor(value, "sub", ancestors)}
                <span className="keyword">)</span>
            </UiWrapped>

            case "Record Type": return <UiWrapped className="record-type">
                <div>
                    <span className="keyword whitespace-right">Record Type</span>
                    <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                </div>
                <div className="attributes">
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
            </UiWrapped>

            default: return <div>
                <em>{"No projection defined for concept: " + value.concept}</em>
            </div>
        }

    }

    return <em>{"No projection defined for value: " + value}</em>
})

