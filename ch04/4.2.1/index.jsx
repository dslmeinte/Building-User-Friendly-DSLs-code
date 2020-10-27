import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/listing3.2"


import { isAstObject } from "../../ch03/ast"

const Projection = ({ value }) => {
    if (isAstObject(value)) {
        switch (value.concept) {
            case "Record Type": return <div>
                <div>
                    <span className="keyword">Record Type</span>&nbsp;
                    <span className="value">{value.settings["name"]}</span>
                </div>
                <div className="attributes">
                    <div><span className="keyword">attributes:</span></div>
                    {value.settings["attributes"].map((attribute, index) =>
                        <Projection value={attribute} key={index} />
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


require("../../../src/frontend/grayscale")

