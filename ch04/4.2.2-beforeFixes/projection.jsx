import React from "react"

import { isAstObject } from "../common/ast"


export const Projection = ({ astObject  }) => {
    if (isAstObject(astObject)) {
        // (cases are in alphabetical order of concept labels:)
        switch (astObject.concept) {

            case "Data Attribute": return <div className="attribute">
                <span className="keyword ws-right">the</span>
                <span className="value">{astObject.settings["name"]}</span>
                <span className="keyword ws-both">is a</span>
                <span className="value enum-like ws-right">{astObject.settings["type"]}</span>
                {astObject.settings["initial value"] &&
                    <div>
                        <span className="keyword ws-right">initially</span>
                        <Projection astObject={astObject.settings["initial value"]} />
                    </div>
                }
            </div>

            case "Record Type": return <div>
                <div>
                    <span className="keyword ws-right">Record Type</span>
                    <span className="value">{astObject.settings["name"]}</span>
                </div>
                <div className="section">
                    <div><span className="keyword">attributes:</span></div>
                    {astObject.settings["attributes"].map((attribute, index) =>
                        <Projection astObject={attribute} key={index} />
                    )}
                </div>
            </div>

            default: return <div>
                <em>{"No projection defined for concept: " + astObject.concept}</em>
            </div>
        }
    }
    return <em>{"No projection defined for value: " + astObject}</em>
}

