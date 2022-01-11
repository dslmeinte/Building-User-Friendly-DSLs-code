import React from "react"
import { observable } from "mobx"

import { isAstObject } from "../common/ast"
import { TextValue } from "./value-components"


const indefiniteArticleFor = (nextWord) => "a" + (nextWord.toLowerCase().match(/^[aeiou]/) ? "n" : "")


export const Projection = ({ astObject, parent }) => {
    if (isAstObject(astObject)) {

        const { settings } = astObject
        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Attribute Reference": return <div className="inline">
                <span className="keyword ws-right">the</span>
                <span className="reference">{settings["attribute"].ref.settings["name"]}</span>
            </div>

            case "Data Attribute": return <div className="attribute">
                <span className="keyword ws-right">the</span>
                <TextValue editState={observable({ value: settings["name"], inEdit: false })} />
                <span className="keyword ws-both">is {indefiniteArticleFor(settings["type"])}</span>
                <span className="value enum-like ws-right">{settings["type"]}</span>
                {settings["initial value"] &&
                    <div className="inline">
                        <span className="keyword ws-right">initially</span>
                        <Projection
                            astObject={settings["initial value"]}
                            parent={astObject}
                        />
                    </div>
                }
            </div>

            case "Number": {
                const type = parent && parent.concept === "Data Attribute" && parent.settings["type"]
                return <div className="inline">
                    {type === "amount" && <span className="keyword">$</span>}
                    <span className="value">{settings["value"]}</span>
                    {type === "percentage" && <span className="keyword">%</span>}
                </div>
            }

            case "Record Type": return <div>
                <div>
                    <span className="keyword ws-right">Record Type</span>
                    <TextValue editState={observable({ value: settings["name"], inEdit: false })} />
                </div>
                <div className="section">
                    <div><span className="keyword">attributes:</span></div>
                    {settings["attributes"].map((attribute, index) =>
                        <Projection
                            astObject={attribute}
                            parent={astObject}
                            key={index}
                        />
                    )}
                </div>
            </div>

            default: return <div className="inline">
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }

    return <em>{"No projection defined for value: " + astObject}</em>
}

