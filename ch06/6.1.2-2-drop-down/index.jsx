import React from "react"
import { createRoot } from "react-dom/client"
import { observable } from "mobx"

require("./styling.css")

import rental from "../../ch03/rental-AST"
import { placeholderAstObject } from "../common/ast"

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

createRoot(document.getElementById("root"))
    .render(
        <Projection
            astObject={observable(rental)}
            ancestors={[]}
        />
    )

