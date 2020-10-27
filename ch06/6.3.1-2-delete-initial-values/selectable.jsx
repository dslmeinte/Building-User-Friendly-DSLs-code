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


// A component that wraps the projection of an AST object ('astObject') and makes it (de-)selectable and deletable (through 'deleteAstObject'):
export const Selectable = observer(({ className, astObject, deleteAstObject, children }) =>
    <div
        className={className + " selectable" + (selection.selected === astObject ? " selected" : "")}
        onClick={action((event) => {
            event.stopPropagation()
            selection.selected = astObject
        })}
        onKeyDown={action((event) => {
            if (event.key === "Backspace" || event.key === "Delete") {
                event.preventDefault()
                // Delete 'astObject' (if we know how):
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

