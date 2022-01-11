import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

import { isAstObject, placeholderAstObject } from "../common/ast"
import { AddNewButton } from "./support-components"
import { DropDownValue, NumberValue, TextValue } from "./value-components"


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.toLowerCase().match(/^[aeiou]/)) ? "n" : "")


export const Projection = observer(({ astObject, ancestors }) => {
    if (isAstObject(astObject)) {

        const { settings } = astObject
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })

        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <div className="inline">
                    <span className="keyword ws-right">the</span>
                    <DropDownValue
                        editState={observable({
                            // Only navigate reference relation when there's one:
                            value: settings["attribute"] && settings["attribute"].ref.settings["name"],
                            inEdit: false,
                            setValue: (newValue) => {
                                // Always make a new reference object, instead of just setting .ref, because the reference relation might not exist yet:
                                settings["attribute"] = {
                                    ref: attributes.find((attribute) => attribute.settings["name"] === newValue)
                                }
                                // Note: this object is automatically observable, because the whole AST is deeply-observable.
                                // In fact: because the value of ref is already observable, ref is effectively decorated as 'observable.ref'.
                            }
                        })}
                        className="reference"
                        options={attributes.map((attribute) => attribute.settings["name"])}
                        // Provide a placeholder for an unset reference relation:
                        actionText="(choose an attribute to reference)"
                        placeholderText="<attribute>"
                    />
                </div>
            }

            case "Data Attribute": return <div className="attribute">
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
                                        settings["initial value"] = {
                                            concept: newValue,
                                            settings: {}
                                        }
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
                            />
                        }
                    </div>
                    : <AddNewButton buttonText="+ initial value" actionFunction={() => {
                        settings["initial value"] = placeholderAstObject
                    }} />
                }
            </div>

            case "Number": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Data Attribute")
                const type = attribute.settings["type"]
                return <div className="inline">
                    {type === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {type === "date range" && <span className="keyword ws-left">days</span>}
                    {type === "percentage" && <span className="keyword">%</span>}
                </div>
            }

            case "Record Type": return <div>
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
                            key={index}
                        />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        settings["attributes"].push({
                            concept: "Data Attribute",
                            settings: {}
                        })
                    }} />
                </div>
            </div>

            default: return <div className="inline">
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }

    return <em>{"No projection defined for value: " + astObject}</em>
})

