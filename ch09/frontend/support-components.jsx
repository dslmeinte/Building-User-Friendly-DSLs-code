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


// with Refactored-out traces for 6th item in Exercise of §9.1.3:
export const AstObjectUiWrapper = observer(({ className, astObject, deleteAstObject, issues, children }) => {
    let hoverText = ""
    const hasIssues = issues.length > 0
    if (hasIssues) {
        hoverText += issues.join("\n")
    }
    return <div
        className={asClassNameArgument(className, "selectable", (selection.selected === astObject) && "selected")}
        title={hoverText}
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
            if (event.key === "Escape") {
                deselect()
            }
        })}
        tabIndex={0}
    >
        {hasIssues && <span className="issue-marker">&#9888;</span>}
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

