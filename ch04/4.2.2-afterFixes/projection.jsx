import React from "react"

import { isAstObject } from "../common/ast"


const indefiniteArticleFor = (nextWord) => "a" + (nextWord.toLowerCase().match(/^[aeiou]/) ? "n" : "")


export const Projection = ({ astObject  }) => {
    if (isAstObject(astObject)) {
        const { settings } = astObject
        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Data Attribute": return <div className="attribute">
                <span className="keyword ws-right">the</span>
                <span className="value">{settings["name"]}</span>
                <span className="keyword ws-both">is {indefiniteArticleFor(settings["type"])}</span>
                <span className="value enum-like ws-right">{settings["type"]}</span>
                {settings["initial value"] &&
                    <div className="inline">
                        <span className="keyword ws-right">initially</span>
                        <Projection astObject={settings["initial value"]} />
                    </div>
                }
            </div>

            case "Record Type": return <div>
                <div>
                    <span className="keyword ws-right">Record Type</span>
                    <span className="value">{settings["name"]}</span>
                </div>
                <div className="section">
                    <div><span className="keyword">attributes:</span></div>
                    {settings["attributes"].map((attribute, index) =>
                        <Projection astObject={attribute} key={index} />
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

