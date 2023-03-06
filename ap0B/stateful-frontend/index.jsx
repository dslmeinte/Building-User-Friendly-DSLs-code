import React from "react"
import { createRoot } from "react-dom/client"
import { action, observable } from "mobx"
import { observer } from "mobx-react"


const state = observable({
    counter: 0
})

const CounterComponent = observer(({ state }) =>
    <button onClick={action((event) => {
        state.counter++
    })}>{state.counter}</button>
)

createRoot(document.getElementById("root"))
    .render(
        <CounterComponent state={state} />
    )


require("../../../src/frontend/grayscale")

