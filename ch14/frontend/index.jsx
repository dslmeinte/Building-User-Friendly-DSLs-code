import React from "react"
import { render } from "react-dom"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

require("./styling.css")


import { deserializeObservably, serialize } from "../common/ast"

const astContainer = observable({
    ast: null
})

const apiUrl = "http://localhost:8080/contents"

const expectedDslVersion = require("../backend/data/metaData.json")["DSL-version"]
// We have to 'require' this information, because we can't read it from the file system while running.

fetch(apiUrl)
    .then((response) => {
        const receivedDslVersion = response.headers.get("X-DSL-Version")
        if (receivedDslVersion !== expectedDslVersion) {
            alert(`DSL version mismatch: received ${receivedDslVersion}, but expected ${expectedDslVersion}`)
        }
        return response
    })
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

