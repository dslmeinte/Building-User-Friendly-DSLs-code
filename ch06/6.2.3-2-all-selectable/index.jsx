import React from "react"
import { createRoot } from "react-dom/client"
import { observable } from "mobx"

require("./styling.css")

import rental from "../../ch03/rental-AST"

import { Projection } from "./projection"

createRoot(document.getElementById("root"))
    .render(
        <Projection
            astObject={observable(rental)}
            ancestors={[]}
        />
    )

