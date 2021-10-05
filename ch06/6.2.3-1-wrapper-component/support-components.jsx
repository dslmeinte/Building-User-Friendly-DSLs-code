import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

import { asClassNameArgument } from "./css-util"


const selection = observable({ selected: undefined })

const deselect = () => {
    selection.selected = undefined
}

document.addEventListener("mousedown", action((event) => {
    if (!event.target.classList.contains("selectable")) {
        deselect()
    }
}))


// A component that wraps the projection of an AST object ('astObject'):
export const AstObjectUiWrapper = observer(({ className, astObject, children }) => {
    return <div
        className={asClassNameArgument(className, "selectable", (selection.selected === astObject) && "selected")}
        onClick={action((event) => {
            event.stopPropagation()
            selection.selected = astObject
        })}
    >
        {children}
    </div>
})


export const AddNewButton = ({ buttonText, actionFunction }) =>
    <button
        className="add-new"
        tabIndex={-1}
        onClick={action((event) => {
            event.stopPropagation()
            actionFunction()
        })}
    >{buttonText}</button>

