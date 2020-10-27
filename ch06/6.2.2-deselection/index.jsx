import React from "react"
import { render } from "react-dom"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

require("./styling.css")

import rental from "../../ch03/listing3.2"


const indefiniteArticleFor = (nextword) => "a" + ((typeof nextword === "string" && nextword.match(/^[aeiou]/)) ? "n" : "")


const selection = observable({ selected: undefined })

// add an event listener through the DOM API to respond to any click anywhere:
document.addEventListener("mousedown", (event) => {
    if (!event.target.classList.contains("selectable")) {
        selection.selected = undefined
    }
})


import { isAstObject } from "../../ch03/ast"
import { TextValue, NumberValue, DropDownValue } from "./value-components"

const placeholderAstObject = "<placeholder for an AST object>"

const AddNewButton = ({ buttonText, actionFunction }) =>
    <button
        className="add-new"
        tabIndex={-1}
        onClick={action((event) => {
            event.stopPropagation()
            actionFunction()
        })}
    >{buttonText}</button>

const Projection = observer(({ value, ancestors }) => {
    if (isAstObject(value)) {
        const { settings } = value
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })
        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {
            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <div className="inline">
                    <span className="keyword">the </span>
                    <DropDownValue
                        editState={observable({
                            // Only navigate reference relation when there's one:
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
                </div>
            }
            case "Data Attribute": return <div
                className={"attribute selectable" + (selection.selected === value ? " selected" : "")}
                onClick={action((_) => {
                    selection.selected = value
            })}>
                <span className="keyword">the</span>&nbsp;
                <TextValue editState={editStateFor("name")} placeholderText="<name>" />&nbsp;
                <span className="keyword">is {indefiniteArticleFor(settings["type"])}</span>&nbsp;
                <DropDownValue
                    className="value quoted-type"
                    editState={editStateFor("type")}
                    options={[ "amount", "percentage", "period in days" ]}
                    placeholderText="<type>"
                />&nbsp;
                {settings["initial value"]
                    ? <div className="inline">
                        <span className="keyword">initially</span>&nbsp;
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
                                    "Number Literal"
                                ]}
                                placeholderText="<initial value>"
                                actionText="(choose concept for initial value)"
                            />
                            : <Projection value={settings["initial value"]} ancestors={[ value, ...ancestors ]} />
                        }
                    </div>
                    : <AddNewButton buttonText="+ initial value" actionFunction={() => {
                        settings["initial value"] = placeholderAstObject
                    }} />
                }
            </div>
            case "Number Literal": {
                const attribute = ancestors.find((ancestor) => ancestor.concept === "Data Attribute")
                const attributeType = attribute.settings["type"]
                return <div className="inline">
                    {attributeType === "amount" && <span className="keyword">$</span>}
                    <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                    {attributeType === "percentage" && <span className="keyword">%</span>}
                    {attributeType === "period in days" && <span className="keyword">&nbsp;days</span>}
                </div>
            }
            case "Record Type": return <div>
                <div>
                    <span className="keyword">Record Type</span>&nbsp;
                    <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                </div>
                <div className="attributes">
                    <div><span className="keyword">attributes:</span></div>
                    {settings["attributes"].map((attribute, index) => 
                        <Projection value={attribute} key={index} ancestors={[ value, ...ancestors ]} />
                    )}
                    <AddNewButton buttonText="+ attribute" actionFunction={() => {
                        settings["attributes"].push({
                            concept: "Data Attribute",
                            settings: {}
                        })
                    }} />
                </div>
            </div>
            default: return <div>
                <em>{"No projection defined for concept: " + value.concept}</em>
            </div>
        }
    }
    return <em>{"No projection defined for value: " + value}</em>
})


render(
    <Projection value={observable(rental)} ancestors={[]} />,
    document.getElementById("root")
)


require("../../../src/frontend/grayscale")

