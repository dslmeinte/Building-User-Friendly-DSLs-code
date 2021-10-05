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


export const AstObjectUiWrapper = observer(({ className, astObject, children }) => {
    return <div
        className={asClassNameArgument(className, "selectable", (selection.selected === astObject) && "selected")}
        onClick={action((event) => {
            event.stopPropagation()
            selection.selected = astObject
        })}
        // To capture Backspace and "Delete", only 'onKeyDown' in combination with 'tabIndex={0}' work:
        onKeyDown={action((event) => {
            if (selection.selected === astObject && event.key === "Backspace" || event.key === "Delete") {
                // Prevent browser default for Backspace going back in history:
                event.preventDefault()
                // TODO  delete 'astObject'
            }
        })}
        // To unselect:
        onKeyUp={action((event) => {
            if (event.key === "Escape") {
                deselect()
            }
        })}
        tabIndex={0}
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

