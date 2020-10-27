import React from "react"

// Add imports for MobX:
import { action } from "mobx"
import { observer } from "mobx-react"


// Wrap the React component functions with observer(...):
export const TextValue = observer(({ editState }) =>
    editState.inEdit
        ? <input type="text"
            defaultValue={editState.value}
            autoFocus={true}
        />
        : <span className="value"
            // Wrap closure functions that modify observed state with action(...):
            onClick={action((_) => {
                editState.inEdit = true
            })}
        >{editState.value}</span>
)

