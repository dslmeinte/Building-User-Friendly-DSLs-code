import React from "react"
import { createRoot } from "react-dom/client"

require("./styling.css")

import rental from "../../ch03/rental-AST"

import { Projection } from "./projection"

createRoot(document.getElementById("root"))
    .render(
        <Projection
            astObject={rental}
        />
    )

