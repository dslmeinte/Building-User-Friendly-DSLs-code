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

