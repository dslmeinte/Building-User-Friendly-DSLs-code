import React from "react"
import { render } from "react-dom"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

require("./styling.css")


import { deserializeObservably, serialize } from "../ast"

const astContainer = observable({
    ast: null
})

const apiUrl = "http://localhost:8080/ast"

fetch(apiUrl)
    .then((response) => response.json())
    .then(action((json) => {
        astContainer.ast = deserializeObservably(json)
    }))

const save = (_) => {
    fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serialize(astContainer.ast))
    })
    // (ignore returned Promise)
}


import { Projection } from "./projection"

const App = observer(() =>
    astContainer.ast
        ? <div>
            <button className="save" onClick={save}>Save</button>
            <Projection value={astContainer.ast} ancestors={[]} />
        </div>
        : <div className="spinner"></div>
)

render(
    <App />,
    document.getElementById("root")
)

