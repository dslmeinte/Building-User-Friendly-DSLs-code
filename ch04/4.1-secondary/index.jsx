import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/rental-AST"

import { Projection } from "./projection"

render(
    // <span>Projection should go here!</span>,
    <Projection value={rental} />,
    document.getElementById("root")
)

