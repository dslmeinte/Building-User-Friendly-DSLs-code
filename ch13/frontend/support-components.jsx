import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

import { typeAsText, typeOf } from "../language/type-system"
import { issuesFor } from "../language/constraints"


const selection = observable({ selected: undefined })

const deselect = () => {
    selection.selected = undefined
}

document.addEventListener("mousedown", action((event) => {  // FIXME  back-propagate!
    if (!event.target.classList.contains("selectable")) {
        deselect()
    }
}))


const asClassNamesArgument = (...classNames) => classNames.filter((className) => typeof className === "string").join(" ")

export const AstObjectUiWrapper = observer(({ astObject, ancestors, setValue, className, children, leftTransform, rightTransform, /* Exercise 13.7: */showType }) => {
    let hoverText = `Concept: ${astObject.concept}\n`
    // Exercise 13.7:
    if (showType) {
        hoverText += `Type: ${typeAsText(typeOf(astObject, ancestors))}\n`
    }
    const issues = issuesFor(astObject, ancestors)
    const hasIssues = issues.length > 0
    if (hasIssues) {
        hoverText += "Issues:\n"
        hoverText += issues.map((issue) => `\t${issue}\n`).join("")
    }
    const isSideTransformable = !!leftTransform || !!rightTransform
    return <div
        className={asClassNamesArgument(className, "selectable", selection.selected === astObject && "selected", isSideTransformable && "side-transformable")}
        title={hoverText}
        onClick={action((event) => {
            event.stopPropagation()
            selection.selected = astObject
        })}
        onKeyDown={action((event) => {
            if (selection.selected === astObject && event.key === "Backspace" || event.key === "Delete") {
                event.preventDefault()
                event.stopPropagation()
                if (typeof setValue === "function") {
                    setValue()
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
        {leftTransform && <span className="side-transform" onClick={action(leftTransform)}>&larr;</span>}
        {children}
        {rightTransform && <span className="side-transform" onClick={action(rightTransform)}>&rarr;</span>}
    </div>
})


const AddNewButton = ({ buttonText, actionFunction }) =>
    <button
        className="add-new"
        tabIndex={-1}
        onClick={action((event) => {
            event.stopPropagation()
            actionFunction()
        })}
    >{buttonText}</button>
module.exports.AddNewButton = AddNewButton

