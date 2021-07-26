import React from "react"
import { action } from "mobx"
import { observer } from "mobx-react"

import { typeAsText, typeOf } from "../common/language/type-system"
import { issuesFor } from "../common/language/constraints"
import { Selectable } from "./selectable"


export const AstObjectUiWrapper = observer(({ astObject, ancestors, deleteAstObject, className, children, leftTransform, rightTransform, showType }) => {
    let hoverText = `Concept: ${astObject.concept}\n`
    if (showType) {
        hoverText += `Type: ${typeAsText(typeOf(astObject, ancestors))}\n`
    }
    const issues = issuesFor(astObject, ancestors)
    const hasIssues = issues.length > 0
    if (hasIssues) {
        hoverText += "Issues:\n"
        hoverText += issues.map((issue) => `\t${issue}\n`).join()
    }
    // TODO  use template-utils to help with rendering hover text?
    const isSideTransformable = !!leftTransform || !!rightTransform
    return <div className={className + (isSideTransformable ? " side-transformable" : "")} title={hoverText}>
        {hasIssues && <span className="issue-marker">&#9888;</span>}
        {leftTransform && <span className="side-transform" onClick={action(leftTransform)}>&larr;</span>}
        <Selectable className={className} astObject={astObject} deleteAstObject={deleteAstObject}>
            {children}
        </Selectable>
        {rightTransform && <span className="side-transform" onClick={action(rightTransform)}>&rarr;</span>}
    </div>
})

