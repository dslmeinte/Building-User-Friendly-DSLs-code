import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { astReferenceTo, isAstObject, newAstObject, placeholderAstObject } from "../common/ast"
import { AddNewButton, AstObjectUiWrapper } from "./support-components"
import { DropDownValue, NumberValue, TextValue } from "./value-components"
import { issuesFor } from "../language/constraints"


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.toLowerCase().match(/^[aeiou]/)) ? "n" : "")


export const Projection = observer(({ astObject, ancestors, replaceWith }) => {
    if (isAstObject(astObject)) {

        const { settings } = astObject
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })
        const issues = issuesFor(astObject, ancestors)

        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <AstObjectUiWrapper className="inline" astObject={astObject} issues={issues} deleteAstObject={replaceWith}>
                    <span className="keyword ws-right">the</span>
                    <DropDownValue
                        editState={observable({
                            // Only navigate reference relation when there's one:
                            value: settings["attribute"] && settings["attribute"].ref.settings["name"],
                            inEdit: false,
                            setValue: (newValue) => {
                                settings["attribute"] = astReferenceTo(
                                    attributes.find((attribute) => attribute.settings["name"] === newValue)
                                )
                            }
                        })}
                        className="reference"
                        options={attributes.map((attribute) => attribute.settings["name"])}
                        actionText="(choose an attribute to reference)"
                        placeholderText="<attribute>"
                    />
                </AstObjectUiWrapper>
            }

            case "Data Attribute": return <AstObjectUiWrapper className="attribute" astObject={astObject} issues={issues} deleteAstObject={replaceWith}>
                <span className="keyword ws-right">the</span>
                <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                <span className="keyword ws-both">is {indefiniteArticleFor(settings["type"])}</span>
                <DropDownValue
                    className="value enum-like ws-right"
                    editState={editStateFor("type")}
                    options={[ "amount", "date range", "percentage" ]}
                    placeholderText="<type>"
                />
                {settings["initial value"]
                    ? <div className="inline">
                        <span className="keyword ws-right">initially</span>
                        {settings["initial value"] === placeholderAstObject
                            ? <DropDownValue
                                editState={observable({
                                    inEdit: true,
                                    setValue: (newValue) => {
                                        settings["initial value"] = newAstObject(newValue)
                                    }
                                })}
                                options={[
                                    "Attribute Reference",
                                    "Number"
                                ]}
                                placeholderText="<initial value>"
                                actionText="(choose concept for initial value)"
                            />
                            : <Projection
                                astObject={settings["initial value"]}
                                ancestors={[ astObject, ...ancestors ]}
                                replaceWith={() => {
                                    delete settings["initial value"]
                                }}
                            />
                        }
                    </div>
                    : <AddNewButton buttonText="+ initial value" actionFunction={() => {
                        settings["initial value"] = placeholderAstObject
                    }} />
                }
            </AstObjectUiWrapper>

            case "Number": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Data Attribute")
                const type = attribute.settings["type"]
                return <AstObjectUiWrapper className="inline" astObject={astObject} issues={issues} deleteAstObject={replaceWith}>
                    {type === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {type === "date range" && <span className="keyword ws-left">days</span>}
                    {type === "percentage" && <span className="keyword">%</span>}
                </AstObjectUiWrapper>
            }

            case "Record Type": return <AstObjectUiWrapper astObject={astObject} issues={issues} deleteAstObject={replaceWith}>
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
                        settings["attributes"].push(newAstObject("Data Attribute"))
                    }} />
                </div>
            </AstObjectUiWrapper>

            default: return <div className="inline">
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }

    return <em>{"No projection defined for value: " + astObject}</em>
})

