import React from "react"
import { render } from "react-dom"
import { observable } from "mobx"

require("./styling.css")

import rental from "../../ch03/rental-AST"

// pre-add an attribute for quick testing:
rental.settings["attributes"].push({
    concept: "Data Attribute",
    settings: {
        "name": "new attribute",
        "type": "amount",
        // emulate "+ initial value" already being clicked:
        "initial value": placeholderAstObject
    }
})

import { Projection } from "./projection"

render(
    <Projection astObject={observable(rental)} ancestors={[]} />,
    document.getElementById("root")
)

