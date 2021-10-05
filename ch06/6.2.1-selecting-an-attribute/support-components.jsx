import React from "react"
import { action } from "mobx"


export const AddNewButton = ({ buttonText, actionFunction }) =>
    <button
        className="add-new"
        tabIndex={-1}
        onClick={action((event) => {
            // Prevent event propagating to surrounding DOM elements:
            event.stopPropagation()
            actionFunction()
        })}
    >{buttonText}</button>

