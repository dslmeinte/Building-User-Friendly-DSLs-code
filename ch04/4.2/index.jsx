import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/listing3.2"


import { isAstObject } from "../../ch03/ast"

const Projection = ({ value }) => {
    if (isAstObject(value)) {
        switch (value.concept) {
            default: return <em>{"No projection defined for concept: " + value.concept}</em>
        }
    }
    return <em>{"No projection defined for value: " + value}</em>
}


render(
    <Projection value={rental} />,
    document.getElementById("root")
)


require("../../../src/frontend/grayscale")

