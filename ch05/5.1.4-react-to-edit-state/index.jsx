import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/listing3.2"

import { Projection } from "./projection"

render(
    <Projection astObject={rental} />,
    document.getElementById("root")
)

