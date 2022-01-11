import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { astReferenceTo, isAstObject, newAstObject, placeholderAstObject, replaceInMultipleValue, replaceSingleValue } from "../common/ast"
import { AddNewButton, AstObjectUiWrapper } from "./support-components"
import { DropDownValue, NumberValue, TextValue } from "./value-components"
import { issuesFor } from "../language/constraints"
import { requiresParentheses } from "../language/operators"


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
                "Number",
                // Exercise 12.1:
                "Parentheses"
            ]}
            placeholderText={`<${propertyName}>`}
            actionText={`(choose concept for ${propertyName})`}
        />
        : <Projection
            astObject={value}
            ancestors={[ astObject, ...ancestors ]}
            // Exercise 12.10:
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

        const UiWrapped = ({ className, children, /* Exercise 12.12: */ sideTransformable }) => <AstObjectUiWrapper
            className={className}
            astObject={astObject}
            deleteAstObject={replaceWith}
            issues={issues}
            // Exercise 12.13:
            leftTransform={sideTransformable && (() => {
                replaceWith(newAstObject("Binary Operation", { "right operand": astObject }))
            })}
            // Exercise 12.12:
            rightTransform={sideTransformable && (() => {
                replaceWith(newAstObject("Binary Operation", { "left operand": astObject }))
            })}
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
                    options={[ "amount", "date range", "percentage" ]}
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
                return <UiWrapped className="inline" /* Exercise 12.12: */ sideTransformable>
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
                // Exercise 12.5:
                const hasVirtualParentheses = requiresParentheses(astObject, ancestors[0])
                return <UiWrapped className="inline">
                    {hasVirtualParentheses && <span className="keyword">(</span>}
                    {projectionExpressionFor(astObject, ancestors, "left operand")}
                    <DropDownValue
                        className="value enum-like ws-both"
                        editState={editStateFor("operator")}
                        options={[ "of", "-", "+", "/", "*", "^" ]}
                        placeholderText="<operator>"
                    />
                    {projectionExpressionFor(astObject, ancestors, "right operand")}
                    {hasVirtualParentheses && <span className="keyword">)</span>}
                </UiWrapped>
            }

            case "Number": {
                // Exercise 12.3:
                const type = ancestors[0].concept === "Attribute" ? ancestors[0].settings["type"] : undefined
                return <UiWrapped className="inline" /* Exercise 12.12: */ sideTransformable>
                    {type === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {type === "date range" && <span className="keyword ws-left">days</span>}
                    {type === "percentage" && <span className="keyword">%</span>}
                </UiWrapped>
            }

            // Exercise 12.1:
            case "Parentheses": return <UiWrapped className="inline" /* Exercise 12.12: */ sideTransformable>
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
                            // Exercise 12.10:
                            replaceWith={replaceInMultipleValue(astObject, "attributes", index)}
                            key={index}
                        />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        settings["attributes"].push(newAstObject("Attribute"))
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

