import React from "react"
import { render } from "react-dom"
import { observable } from "mobx"

require("./styling.css")

import rental from "../../ch03/listing3.2"

import { Projection } from "./projection"

render(
    <Projection astObject={observable(rental)} />,
    document.getElementById("root")
)

