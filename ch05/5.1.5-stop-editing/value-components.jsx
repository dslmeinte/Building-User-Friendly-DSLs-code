import React from "react"
import { action } from "mobx"
import { observer } from "mobx-react"


export const TextValue = observer(({ editState }) =>
    editState.inEdit
        ? <input type="text"
            defaultValue={editState.value}
            autoFocus={true}
            // React to loosing focus to exit editing:
            onBlur={action((_) => {
                editState.inEdit = false
            })}
            // React to special keys to exit editing:
            onKeyUp={action((event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                    editState.inEdit = false
                }
            })}
        />
        : <span className="value"
            onClick={action((_) => {
                editState.inEdit = true
            })}
        >{editState.value}</span>
)

