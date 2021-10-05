import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { astReferenceTo, isAstObject, newAstObject, placeholderAstObject } from "../common/ast"
import { AddNewButton, AstObjectUiWrapper } from "./support-components"
import { DropDownValue, NumberValue, TextValue } from "./value-components"
import { issuesFor } from "../language/constraints"


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.toLowerCase().match(/^[aeiou]/)) ? "n" : "")


// Exercise 11.5:
const projectionExpressionFor = (astObject, ancestors, propertyName) => {
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
                // implementation of Exercise 11.4:
                "Binary Operation",
                "Number"
            ]}
            placeholderText={`<${propertyName}>`}
            actionText={`(choose concept for ${propertyName})`}
        />
        : <Projection
            astObject={value}
            ancestors={[ astObject, ...ancestors ]}
            replaceWith={() => {
                delete settings[propertyName]
            }}
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

        // Exercise 11.7:
        const UiWrapped = ({ className, children }) => <AstObjectUiWrapper
            className={className}
            astObject={astObject}
            deleteAstObject={replaceWith}
            issues={issues}
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
                        {/* Exercise 11.3: */}
                        <DropDownValue
                            className="value keyword ws-right"
                            editState={editStateFor("value kind")}
                            options={[ "initially", "computed as" ]}
                        />
                        {/* Exercise 11.5: */}
                        {projectionExpressionFor(astObject, ancestors, "value")}
                    </div>
                    : <AddNewButton buttonText="+ value" actionFunction={() => {
                        settings["value"] = placeholderAstObject
                        // Exercise 11.3:
                        settings["value kind"] = "initially"
                    }} />
                }
            </UiWrapped>

            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <UiWrapped className="inline">
                    <span className="keyword ws-right">the</span>
                    <DropDownValue
                        editState={observable({
                            // Only navigate reference relation when there's one:
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

            // Exercise 11.6:
            case "Binary Operation": {
                return <UiWrapped className="inline">
                    {projectionExpressionFor(astObject, ancestors, "left operand")}
                    <DropDownValue
                        className="value enum-like ws-both"
                        editState={editStateFor("operator")}
                        options={[ "of", "-", "+", "/", "*" ]}
                        placeholderText="<operator>"
                    />
                    {projectionExpressionFor(astObject, ancestors, "right operand")}
                </UiWrapped>
            }

            case "Number": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Attribute")
                const attributeType = attribute.settings["type"]
                return <UiWrapped className="inline">
                    {attributeType === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {attributeType === "date range" && <span className="keyword ws-left">days</span>}
                    {attributeType === "percentage" && <span className="keyword">%</span>}
                </UiWrapped>
            }

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
                            replaceWith={() => {
                                settings["attributes"].splice(index, 1)
                            }}
                            key={index}
                        />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        settings["attributes"].push(newAstObject("Attribute"))
                    }} />
                </div>
            </UiWrapped>

            case "Table": return <div className="table">
                {settings["rows"].map((attribute, index) =>
                    <Projection astObject={attribute} ancestors={[ astObject, ...ancestors ]} key={index} />
                )}
            </div>

            case "Table Row": return <div>
                {settings["items"].map((attribute, index) =>
                    <div key={index} >
                        <Projection astObject={attribute} ancestors={[ astObject, ...ancestors ]} />
                    </div>
                )}
            </div>

            default: return <div className="inline">
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }

    return <em>{"No projection defined for value: " + astObject}</em>
})

