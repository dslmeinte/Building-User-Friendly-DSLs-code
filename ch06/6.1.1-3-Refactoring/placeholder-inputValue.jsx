import {observer} from "mobx-react";
import {action} from "mobx";
import React from "react";

const isMissing = (value) => value === null || value === undefined

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
            : <span
                className={"value" + (isMissing(editState.value) ? " value-missing" : "")}
                onClick={action((_) => {
                    editState.inEdit = true
                })}
            >{isMissing(editState.value) ? placeholderText : editState.value}</span>
    )
