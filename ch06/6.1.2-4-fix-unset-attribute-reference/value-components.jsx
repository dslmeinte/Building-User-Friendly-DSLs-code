import React from "react"
import { action } from "mobx"
import { observer } from "mobx-react"


const isMissing = (value) => value === null || value === undefined

const DisplayValue = ({ editState, className, placeholderText }) =>
    <span
        className={isMissing(editState.value) ? "value-missing" : className}
        onClick={action((_) => {
            editState.inEdit = true
        })}
    >{isMissing(editState.value) ? placeholderText : editState.value}</span>


/*
 * A "higher-order component" (HOC) which is function that returns a React component function
 * that's parametrized by the properties passed to the HOC:
 *  - 'inputType' is the type of <input> element, and can be "text", "number", etc.
 *  - 'isValid' is an optional function for validating the new value
 */
const inputValueComponent = ({ inputType, isValid }) =>
    observer(({ editState, placeholderText }) =>
        editState.inEdit
            ? <input
                type={inputType}
                defaultValue={editState.value}
                autoFocus={true}
                onBlur={action((event) => {
                    const newValue = event.target.value
                    if (!isValid || isValid(newValue)) {
                        editState.setValue(newValue)
                    }
                    editState.inEdit = false
                })}
                onKeyUp={action((event) => {
                    if (event.key === "Enter") {
                        const newValue = event.target.value
                        if (!isValid || isValid(newValue)) {
                            editState.setValue(newValue)
                            editState.inEdit = false
                        }
                    }
                    if (event.key === "Escape") {
                        editState.inEdit = false
                    }
                })}
            />
            : <DisplayValue editState={editState} className="value" placeholderText={placeholderText} />
    )


export const TextValue = inputValueComponent({ inputType: "text" })

const isNumber = (str) => !isNaN(str) && (str.trim().length > 0)
export const NumberValue = inputValueComponent({ inputType: "number", isValid: isNumber })


export const DropDownValue = observer(({ editState, className, options, placeholderText, actionText }) =>
    editState.inEdit
        ? <select
            autoFocus={true}
            value={editState.value}
            style={{ width: Math.max(
                    ...options.map((option) => option.length),
                    actionText && actionText.length
                ) + "ch"
            }}
            onChange={action((event) => {
                const newValue = event.target.value
                if (newValue !== actionText) {
                    editState.setValue(newValue)
                    editState.inEdit = false
                }
            })}
            onBlur={action((_) => {
                editState.inEdit = false
            })}
            onKeyUp={action((event) => {
                if (event.key === "Escape") {
                    editState.inEdit = false
                }
            })}
        >
            {actionText && <option key={-1} className="action">{actionText}</option>}
            {options.map((option, index) => <option key={index}>{option}</option>)}
        </select>
        : <DisplayValue editState={editState} className={className} placeholderText={placeholderText} />
)

