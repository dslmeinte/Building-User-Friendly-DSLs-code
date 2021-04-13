import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import { generate as newId } from "shortid"

import { isAstObject, placeholderAstObject, serialize } from "../ast"
import { issuesFor } from "../constraints"
import { Selectable } from "./selectable"
import { DropDownValue, NumberValue, TextValue } from "./value-components"


const AddNewButton = ({ buttonText, actionFunction }) =>
    <button
        className="add-new"
        tabIndex={-1}
        onClick={action((event) => {
            event.stopPropagation()
            actionFunction()
        })}
    >{buttonText}</button>


// Refactored-out component for 6th item in Exercise of §9.1.3:
const IssuesWrapper = (({ issues, className, children }) => <div title={issues.join("\n")} className={className}>
    {issues.length > 0 && <span className="issue-marker">&#9888;</span>}
    {children}
</div>)


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.match(/^[aeiou]/)) ? "n" : "")

export const Projection = observer(({ value, deleteValue, ancestors }) => {
    if (isAstObject(value)) {
        const { settings } = value
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => {
                // for Exercise 10.1:
                console.dir({
                    "changeType": "valueUpdate",
                    "containingObjectID": value.id,
                    "propertyName": propertyName,
                    "newValue": newValue,
                    "oldValue": settings[propertyName]
                })
                settings[propertyName] = newValue
            }
        })
        const issues = issuesFor(value, ancestors)
        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {
            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={deleteValue}>
                        <span className="keyword">the </span>
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
                                        "containingObjectID": value.id,
                                        "propertyName": "attribute",
                                        "newValue": newTargetAttribute && newTargetAttribute.id,
                                        "oldValue": settings["attribute"] && settings["attribute"].ref.id
                                    })
                                    settings["attribute"] = {
                                        ref: newTargetAttribute
                                    }
                                }
                            })}
                            className="data-reference"
                            options={attributes.map((attribute) => attribute.settings["name"])}
                            actionText="(choose an attribute to reference)"
                            placeholderText="<attribute>"
                        />
                    </Selectable>
                </IssuesWrapper>
            }
            case "Attribute": return <IssuesWrapper issues={issues}>
                    <Selectable className="attribute" astObject={value} deleteAstObject={deleteValue}>
                        <span className="keyword">the</span>&nbsp;
                        <TextValue editState={editStateFor("name")} placeholderText="<name>"/>&nbsp;
                        <span className="keyword">is {indefiniteArticleFor(settings["type"])}</span>&nbsp;
                        <DropDownValue
                            className="value quoted-type"
                            editState={editStateFor("type")}
                            options={["amount", "percentage", "period in days"]}
                            placeholderText="<type>"
                        />&nbsp;
                        {settings["value"]
                            ? <div className="inline">
                                <span className="keyword">initially</span>&nbsp;
                                {settings["value"] === placeholderAstObject
                                    ? <DropDownValue
                                        editState={observable({
                                            inEdit: true,
                                            setValue: (newValue) => {
                                                const newObjectId = newId()
                                                // for Exercise 10.1:
                                                console.dir({
                                                    "changeType": "objectCreation",
                                                    "containingObjectID": value.id,
                                                    "propertyName": "value",
                                                    "newObjectId": newObjectId,
                                                    "newObjectConcept": newValue
                                                })
                                                settings["value"] = observable({
                                                    id: newObjectId,
                                                    concept: newValue,
                                                    settings: {}
                                                })
                                            }
                                        })}
                                        options={[
                                            "Attribute Reference",
                                            "Number Literal"
                                        ]}
                                        placeholderText="<value>"
                                        actionText="(choose concept for value)"
                                    />
                                    : <Projection value={settings["value"]} ancestors={[value, ...ancestors]}
                                                  deleteValue={() => {
                                                      // for Exercise 10.1:
                                                      console.dir({
                                                          "changeType": "objectDeletion",
                                                          "containingObjectID": value.id,
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
                    </Selectable>
            </IssuesWrapper>
            case "Number Literal": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Attribute")
                const attributeType = attribute.settings["type"]
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={deleteValue}>
                        {attributeType === "amount" && <span className="keyword">$</span>}
                        <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                        {attributeType === "percentage" && <span className="keyword">%</span>}
                        {attributeType === "period in days" && <span className="keyword">&nbsp;days</span>}
                    </Selectable>
                </IssuesWrapper>
            }
            case "Record Type": return <IssuesWrapper issues={issues}>
                    <Selectable astObject={value}>
                    <div>
                        <span className="keyword">Record Type</span>&nbsp;
                        <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                    </div>
                    <div className="attributes">
                        <div><span className="keyword">attributes:</span></div>
                        {settings["attributes"].map((attribute, index) =>
                            <Projection value={attribute} key={index} ancestors={[ value, ...ancestors ]}
                                        deleteValue={() => {
                                            // for Exercise 10.1:
                                            console.dir({
                                                "changeType": "objectDeletion",
                                                "containingObjectID": value.id,
                                                "propertyName": "attributes",
                                                "deletedObject": serialize(settings["attributes"][index]),
                                                "index": index
                                            })
                                            settings["attributes"].splice(index, 1)
                                        }}
                            />
                        )}
                        <AddNewButton buttonText="+ attribute" actionFunction={() => {
                            const newObjectId = newId()
                            // for Exercise 10.1:
                            console.dir({
                                "changeType": "objectCreation",
                                "containingObjectID": value.id,
                                "propertyName": "attributes",
                                "newObjectId": newObjectId,
                                "newObjectConcept": "Attribute",
                                "newObjectIndex": settings["attributes"].length
                            })
                            settings["attributes"].push({
                                id: newObjectId,
                                concept: "Attribute",
                                settings: {}
                            })
                        }} />
                    </div>
                </Selectable>
            </IssuesWrapper>
            default: return <div>
                <em>{"No projection defined for concept: " + value.concept}</em>
            </div>
        }
    }
    return <em>{"No projection defined for value: " + value}</em>
})

