import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

import { isAstObject } from "../common/ast"
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
                            value: settings["attribute"].ref.settings["name"],
                            inEdit: false,
                            setValue: (newValue) => {
                                settings["attribute"].ref = attributes.find((attribute) => attribute.settings["name"] === newValue)
                            }
                        })}
                        className="reference"
                        options={attributes.map((attribute) => attribute.settings["name"])}
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
                {settings["initial value"] &&
                    <div className="inline">
                        <span className="keyword ws-right">initially</span>
                        <Projection
                            astObject={settings["initial value"]}
                            ancestors={[ astObject, ...ancestors ]}
                        />
                    </div>
                }
            </div>

            case "Number": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Data Attribute")
                const attributeType = attribute.settings["type"]
                return <div className="inline">
                    {attributeType === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} />
                    {attributeType === "date range" && <span className="keyword ws-left">days</span>}
                    {attributeType === "percentage" && <span className="keyword">%</span>}
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
                    <button
                        className="add-new"
                        tabIndex={-1}
                        onClick={action((_) => {
                            settings["attributes"].push({
                                concept: "Data Attribute",
                                settings: {}
                            })
                        })}
                    >+ attribute</button>
                </div>
            </div>

            default: return <div className="inline">
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }

    return <em>{"No projection defined for value: " + astObject}</em>
})

