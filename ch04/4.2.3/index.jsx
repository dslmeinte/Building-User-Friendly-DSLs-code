import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/listing3.2"


const indefiniteArticleFor = (nextword) => "a" + (nextword.match(/^[aeiou]/) ? "n" : "")


import { isAstObject } from "../../ch03/ast"

const Projection = ({ value, parent }) => {
    if (isAstObject(value)) {
        const { settings } = value
        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {
            case "Attribute Reference": return <div className="inline">
                <span className="keyword">the </span>
                <span className="data-reference">{settings["attribute"].ref.settings["name"]}</span>
            </div>
            case "Data Attribute": return <div className="attribute">
                <span className="keyword">the</span>&nbsp;
                <span className="value">{settings["name"]}</span>&nbsp;
                <span className="keyword">is {indefiniteArticleFor(settings["type"])}</span>&nbsp;
                <span className="value quoted-type">{settings["type"]}</span>&nbsp;
                {settings["initial value"] &&
                    <div className="inline">
                        <span className="keyword">initially</span>&nbsp;
                        <Projection value={settings["initial value"]} parent={value} />
                    </div>
                }
            </div>
            case "Number Literal": {
                const attributeType = parent && parent.concept === "Data Attribute" && parent.settings["type"]
                return <div className="inline">
                    {attributeType === "amount" && <span className="keyword">$</span>}
                    <span className="value">{settings["value"]}</span>
                    {attributeType === "percentage" && <span className="keyword">%</span>}
                </div>
            }
            case "Record Type": return <div>
                <div>
                    <span className="keyword">Record Type</span>&nbsp;
                    <span className="value">{settings["name"]}</span>
                </div>
                <div className="attributes">
                    <div><span className="keyword">attributes:</span></div>
                    {settings["attributes"].map((attribute, index) => 
                        <Projection value={attribute} key={index} parent={value} />
                    )}
                </div>
            </div>
            default: return <div>
                <em>{"No projection defined for concept: " + value.concept}</em>
            </div>
        }
    }
    return <em>{"No projection defined for value: " + value}</em>
}


render(
    <Projection value={rental} />,
    document.getElementById("root")
)

