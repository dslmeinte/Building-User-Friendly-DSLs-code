import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { astReferenceTo, isAstObject, isAstReference, newAstObject, placeholderAstObject, serialize } from "../common/ast"
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
            setValue: (newValue) => {
                // for Exercise 10.1:
                console.dir({
                    "changeType": "valueUpdate",
                    "containingObjectID": astObject.id,
                    "propertyName": propertyName,
                    "newValue": newValue,
                    "oldValue": settings[propertyName]
                })
                settings[propertyName] = newValue
            }
        })
        const issues = issuesFor(astObject, ancestors)

        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Attribute": return <AstObjectUiWrapper className="attribute" astObject={astObject} deleteAstObject={replaceWith} issues={issues}>
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
                        <span className="keyword ws-right">initially</span>
                        {settings["value"] === placeholderAstObject
                            ? <DropDownValue
                                editState={observable({
                                    inEdit: true,
                                    setValue: (newValue) => {
                                        const newObject = newAstObject(newValue)
                                        settings["value"] = observable(newObject)
                                        // for Exercise 10.1:
                                        console.dir({
                                            "changeType": "objectCreation",
                                            "containingObjectID": astObject.id,
                                            "propertyName": "value",
                                            "newObjectId": newObject.id,
                                            "newObjectConcept": newValue
                                        })
                                    }
                                })}
                                options={[
                                    "Attribute Reference",
                                    "Number"
                                ]}
                                placeholderText="<value>"
                                actionText="(choose concept for value)"
                            />
                            : <Projection
                                astObject={settings["value"]}
                                ancestors={[astObject, ...ancestors]}
                                replaceWith={() => {
                                    // for Exercise 10.1:
                                    console.dir({
                                        "changeType": "objectDeletion",
                                        "containingObjectID": astObject.id,
                                        "propertyName": "value",
                                        "deletedObject": serialize(settings["value"])
                                    })
                                    delete settings["value"]
                                }}
                            />
                        }
                    </div>
                    : <AddNewButton buttonText="+ value" actionFunction={() => {
                        settings["value"] = placeholderAstObject
                    }} />
                }
            </AstObjectUiWrapper>

            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <AstObjectUiWrapper className="inline" astObject={astObject} deleteAstObject={replaceWith} issues={issues}>
                    <span className="keyword ws-right">the</span>
                    <DropDownValue
                        editState={observable({
                            // Only navigate reference relation when there's one:
                            value: settings["attribute"] && settings["attribute"].ref.settings["name"],
                            inEdit: false,
                            setValue: (newValue) => {
                                const newTargetAttribute = attributes.find((attribute) => attribute.settings["name"] === newValue)
                                // for Exercise 10.1:
                                console.dir({
                                    "changeType": "refUpdate",
                                    "containingObjectID": astObject.id,
                                    "propertyName": "attribute",
                                    "newValue": newTargetAttribute && newTargetAttribute.id,
                                    "oldValue": isAstReference(settings["attribute"]) && settings["attribute"].ref.id
                                })
                                settings["attribute"] = astReferenceTo(newTargetAttribute)
                            }
                        })}
                        className="reference"
                        options={attributes.map((attribute) => attribute.settings["name"])}
                        actionText="(choose an attribute to reference)"
                        placeholderText="<attribute>"
                    />
                </AstObjectUiWrapper>
            }

            case "Number": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Attribute")
                const type = attribute.settings["type"]
                return <AstObjectUiWrapper className="inline" astObject={astObject} deleteAstObject={replaceWith} issues={issues}>
                    {type === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {type === "date range" && <span className="keyword ws-left">days</span>}
                    {type === "percentage" && <span className="keyword">%</span>}
                </AstObjectUiWrapper>
            }

            case "Record Type": return <AstObjectUiWrapper astObject={astObject} deleteAstObject={replaceWith} issues={issues}>
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
                                // for Exercise 10.1:
                                console.dir({
                                    "changeType": "objectDeletion",
                                    "containingObjectID": astObject.id,
                                    "propertyName": "attributes",
                                    "deletedObject": serialize(settings["attributes"][index]),
                                    "index": index
                                })
                                settings["attributes"].splice(index, 1)
                            }}
                            key={index}
                        />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        const newAttribute = newAstObject("Attribute")
                        settings["attributes"].push(newAttribute)
                        // for Exercise 10.1:
                        console.dir({
                            "changeType": "objectCreation",
                            "containingObjectID": astObject.id,
                            "propertyName": "attributes",
                            "newObjectId": newAttribute.id,
                            "newObjectConcept": "Attribute",
                            "newObjectIndex": settings["attributes"].length
                        })
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

