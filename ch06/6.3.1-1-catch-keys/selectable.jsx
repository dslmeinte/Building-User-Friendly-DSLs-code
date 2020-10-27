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


export const Selectable = observer(({ className, astObject, children }) =>
    <div
        className={className + " selectable" + (selection.selected === astObject ? " selected" : "")}
        onClick={action((event) => {
            event.stopPropagation()
            selection.selected = astObject
        })}
        // To capture Backspace and "Delete", only 'onKeyDown' in combination with 'tabIndex={0}' work:
        onKeyDown={action((event) => {
            if (event.key === "Backspace" || event.key === "Delete") {
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
)

