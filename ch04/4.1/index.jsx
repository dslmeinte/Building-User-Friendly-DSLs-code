import React from "react"
import { render } from "react-dom"

require("./styling.css")

import rental from "../../ch03/listing3.2"


const Projection = ({ value }) => <span>Projection should go here!</span>

render(
    // <span>Projection should go here!</span>,
    <Projection value={rental} />,
    document.getElementById("root")
)


require("../../../src/frontend/grayscale")

