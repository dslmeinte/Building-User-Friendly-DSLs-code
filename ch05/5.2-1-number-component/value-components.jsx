import React from "react"
import { action } from "mobx"
import { observer } from "mobx-react"


export const TextValue = observer(({ editState }) =>
    editState.inEdit
        ? <input type="text"
            defaultValue={editState.value}
            autoFocus={true}
            onBlur={action((event) => {
                const newValue = event.target.value
                editState.setValue(newValue)
                editState.inEdit = false
            })}
            onKeyUp={action((event) => {
                if (event.key === "Enter") {
                    const newValue = event.target.value
                    editState.setValue(newValue)
                    editState.inEdit = false
                }
                if (event.key === "Escape") {
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


// Validates whether a string is a number:
const isNumber = (str) => !isNaN(str) && (str.trim().length > 0)

export const NumberValue = observer(({ editState }) =>
    editState.inEdit
        ? <input type="number"
            defaultValue={editState.value}
            autoFocus={true}
            onBlur={action((event) => {
                const newValue = event.target.value
                if (isNumber(newValue)) {
                    editState.setValue(newValue)
                }
                editState.inEdit = false
            })}
            onKeyUp={action((event) => {
                if (event.key === "Enter") {
                    const newValue = event.target.value
                    if (isNumber(newValue)) {
                        editState.setValue(newValue)
                        editState.inEdit = false
                    }
                }
                if (event.key === "Escape") {
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

