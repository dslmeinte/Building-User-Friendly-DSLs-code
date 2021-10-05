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


export const AstObjectUiWrapper = observer(({ className, astObject, deleteAstObject, issues, children, /* Exercise 12.13: */ leftTransform, /* Exercise 12.12: */ rightTransform }) => {
    let hoverText = ""
    const hasIssues = issues.length > 0
    if (hasIssues) {
        hoverText += issues.join("\n")
    }
    // Exercise 12.13:
    const isSideTransformable = !!leftTransform || !!rightTransform
    return <div
        className={asClassNameArgument(className, "selectable", (selection.selected === astObject) && "selected", isSideTransformable && "side-transformable")}
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
        })}
        onKeyUp={action((event) => {
            if (event.key === "Escape") {
                deselect()
            }
        })}
        tabIndex={0}
    >
        {hasIssues && <span className="issue-marker">&#9888;</span>}
        {/*// Exercise 12.13:*/}
        {leftTransform && <span className="side-transform" onClick={action(leftTransform)}>&larr;</span>}
        {children}
        {/*// Exercise 12.12:*/}
        {rightTransform && <span className="side-transform" onClick={action(rightTransform)}>&rarr;</span>}
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

