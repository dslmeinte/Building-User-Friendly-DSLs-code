import React from "react"
import { createRoot } from "react-dom/client"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

require("./styling.css")


import { deserializeObservably, serialize } from "../common/ast"

const state = observable({
    ast: null
})

const apiUrl = "http://localhost:8080/contents"

fetch(apiUrl)
    .then((response) => response.json())
    .then(action((json) => {
        state.ast = deserializeObservably(json)
    }))

const save = (_) => {
    fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serialize(state.ast))
    })
    // (ignore returned Promise)
}


import { Projection } from "./projection"

const App = observer(({ state }) =>
    state.ast
        ? <div>
            <button className="save" onClick={save}>Save</button>
            <Projection
                astObject={state.ast}
                ancestors={[]}
            />
        </div>
        : <div className="spinner"></div>
)

createRoot(document.getElementById("root"))
    .render(
        <App state={state} />
    )

