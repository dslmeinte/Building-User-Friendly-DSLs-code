import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { astReferenceTo, isAstObject, newAstObject, placeholderAstObject, replaceInMultipleValue, replaceSingleValue } from "../common/ast"
import { AddNewButton, AstObjectUiWrapper } from "./support-components"
import { DropDownValue, NumberValue, TextValue } from "./value-components"
import { issuesFor } from "../language/constraints"
import { allOperators, requiresParentheses } from "../language/operators"
import { timeUnits } from "../language/time-units"
import { areEqual, builtInTypes, typeOf } from "../language/type-system"


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.toLowerCase().match(/^[aeiou]/)) ? "n" : "")


const projectionExpressionFor = (astObject, ancestors, propertyName) => {
    const { settings } = astObject
    const value = settings[propertyName]
    return (value === undefined || value === placeholderAstObject)
        ? <DropDownValue
            editState={observable({
                setValue: (newValue) => {
                    settings[propertyName] = newAstObject(newValue)
                }
            })}
            options={[
                "Attribute Reference",
                "Binary Operation",
                "Date Range Operation",
                "Number",
                "Parentheses"
            ]}
            placeholderText={`<${propertyName}>`}
            actionText={`(choose concept for ${propertyName})`}
        />
        : <Projection
            astObject={value}
            ancestors={[ astObject, ...ancestors ]}
            replaceWith={replaceSingleValue(astObject, propertyName)}
        />
}


export const Projection = observer(({ astObject, ancestors, replaceWith }) => {
    if (isAstObject(astObject)) {

        const { settings } = astObject
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })
        const issues = issuesFor(astObject, ancestors)

        const UiWrapped = ({ className, children, sideTransformable, showType }) => <AstObjectUiWrapper
            className={className}
            astObject={astObject}
            deleteAstObject={replaceWith}
            issues={issues}
            leftTransform={sideTransformable && (() => {
                replaceWith(newAstObject("Binary Operation", { "right operand": astObject }))
            })}
            rightTransform={sideTransformable && (() => {
                replaceWith(newAstObject("Binary Operation", { "left operand": astObject }))
            })}
            type={showType && typeOf(astObject, ancestors)}
        >
            {children}
        </AstObjectUiWrapper>

        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Attribute": return <UiWrapped className="attribute">
                <span className="keyword ws-right">the</span>
                <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                <span className="keyword ws-both">is {indefiniteArticleFor(settings["type"])}</span>
                <DropDownValue
                    className="value enum-like ws-right"
                    editState={editStateFor("type")}
                    options={[ "amount", "boolean", "date range", "percentage" ]}
                    placeholderText="<type>"
                />
                {settings["value"]
                    ? <div className="inline">
                        <DropDownValue
                            className="value keyword ws-right"
                            editState={editStateFor("value kind")}
                            options={[ "initially", "computed as" ]}
                        />
                        {projectionExpressionFor(astObject, ancestors, "value")}
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
                return <UiWrapped className="inline" sideTransformable showType>
                    <span className="keyword ws-right">the</span>
                    <DropDownValue
                        editState={observable({
                            value: settings["attribute"] && settings["attribute"].ref.settings["name"],
                            inEdit: false,
                            setValue: (newValue) => {
                                settings["attribute"] = astReferenceTo(attributes.find((attribute) => attribute.settings["name"] === newValue))
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
                const hasVirtualParentheses = requiresParentheses(astObject, ancestors[0])
                return <UiWrapped className="inline" showType>
                    {hasVirtualParentheses && <span className="keyword">(</span>}
                    {projectionExpressionFor(astObject, ancestors, "left operand")}
                    <DropDownValue
                        className="value enum-like ws-both"
                        editState={editStateFor("operator")}
                        options={allOperators}
                        placeholderText="<operator>"
                    />
                    {projectionExpressionFor(astObject, ancestors, "right operand")}
                    {hasVirtualParentheses && <span className="keyword">)</span>}
                </UiWrapped>
            }

            case "Business Rule": {
                return <UiWrapped className="business-rule">
                    <div>
                        <span className="keyword ws-right">When</span>
                        {projectionExpressionFor(astObject, ancestors, "condition")}
                        <span className="keyword">,</span>
                    </div>
                    <div>
                        <span className="keyword ws-right">then</span>
                        <Projection
                            astObject={settings["consequence"]}
                            ancestors={[ astObject, ...ancestors ]}
                        />
                        <span className="keyword">.</span>
                    </div>
                </UiWrapped>
            }

            case "Date Range Operation": {
                return <UiWrapped className="inline" showType>
                    {projectionExpressionFor(astObject, ancestors, "operand")}
                    <DropDownValue
                        className="value enum-like ws-both"
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

            case "Increment Effect": {
                return <UiWrapped className="inline" showType>
                    <span className="keyword ws-right">add</span>
                    {projectionExpressionFor(astObject, ancestors, "value")}
                    <span className="keyword ws-both">to</span>
                    <Projection
                        astObject={settings["attribute reference"]}
                        ancestors={[ astObject, ...ancestors ]}
                    />
                </UiWrapped>
            }

            case "Number": {
                const type = typeOf(astObject, ancestors)   // Listing 13.5
                return <UiWrapped className="inline" sideTransformable showType>
                    {areEqual(type, builtInTypes["amount"]) && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {areEqual(type, builtInTypes["date range"]) && <span className="keyword ws-left">days</span>}
                    {areEqual(type, builtInTypes["percentage"]) && <span className="keyword">%</span>}
                </UiWrapped>
            }

            case "Parentheses": return <UiWrapped className="inline" sideTransformable showType>
                <span className="keyword">(</span>
                {projectionExpressionFor(astObject, ancestors, "sub")}
                <span className="keyword">)</span>
            </UiWrapped>

            case "Record Type": return <UiWrapped>
                <div>
                    <span className="keyword ws-right">Record Type</span>
                    <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                </div>
                <div className="section">
                    <div><span className="keyword">attributes:</span></div>
                    {settings["attributes"].map((attribute, index) =>
                        <Projection
                            astObject={attribute}
                            ancestors={[ astObject, ...ancestors ]}
                            replaceWith={replaceInMultipleValue(astObject, "attributes", index)}
                            key={index}
                        />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        settings["attributes"].push(newAstObject("Attribute"))
                    }} />
                </div>
                <div className="section">
                    <div><span className="keyword">business rules:</span></div>
                    {settings["business rules"].map((businessRule, index) =>
                        <Projection
                            astObject={businessRule}
                            ancestors={[ astObject, ...ancestors ]}
                            replaceWith={replaceInMultipleValue(astObject, "business rules", index)}
                            key={index}
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

            default: return <div className="inline">
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }

    return <em>{"No projection defined for value: " + astObject}</em>
})

