import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/listing3.2"


import { isAstObject } from "../../ch03/ast"

const Projection = ({ value  }) => {
    if (isAstObject(value)) {
        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {
            case "Data Attribute": return <div className="attribute">
                <span className="keyword">the</span>&nbsp;
                <span className="value">{value.settings["name"]}</span>&nbsp;
                <span className="keyword">is a</span>&nbsp;
                <span className="value quoted-type">{value.settings["type"]}</span>&nbsp;
                {value.settings["initial value"] &&
                    <div>
                        <span className="keyword">initially</span>&nbsp;
                        <Projection value={value.settings["initial value"]} />
                    </div>
                }
            </div>
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

