import React from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"


const selection = observable({ selected: undefined })

const deselect = () => {
    selection.selected = undefined
}


document.addEventListener("mousedown", (event) => {
    if (!event.target.classList.contains("selectable")) {
        deselect()
    }
})


export const Selectable = observer(({ className, astObject, deleteAstObject, children }) =>
    <div
        className={className + " selectable" + (selection.selected === astObject ? " selected" : "")}
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
)

