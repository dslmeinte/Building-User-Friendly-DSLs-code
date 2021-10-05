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


export const AstObjectUiWrapper = observer(({ className, astObject, deleteAstObject, children }) => {
    return <div
        className={asClassNameArgument(className, "selectable", (selection.selected === astObject) && "selected")}
        onClick={action((event) => {
            event.stopPropagation()
            selection.selected = astObject
        })}
        onKeyDown={action((event) => {
            if (selection.selected === astObject && event.key === "Backspace" || event.key === "Delete") {
                event.preventDefault()
                event.stopPropagation()
                if (typeof deleteAstObject === "function") {
                    deleteAstObject()
                }
            }
        })}
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

