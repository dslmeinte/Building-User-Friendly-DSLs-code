import React from "react"

import { isAstObject } from "../common/ast"


export const Projection = ({ astObject }) => {
    if (isAstObject(astObject)) {
        switch (astObject.concept) {

            case "Record Type": return <div>
                <div>
                    <span className="keyword ws-right">Record Type</span>
                    <span className="value">{astObject.settings["name"]}</span>
                </div>
                <div className="section">
                    <div><span className="keyword">attributes:</span></div>
                    {astObject.settings["attributes"].map((attribute) => <Projection astObject={attribute} />)}
                </div>
            </div>

            default: return <em>{"No projection defined for concept: " + astObject.concept}</em>
        }
    }
    return <em>{"No projection defined for value: " + astObject}</em>
}

