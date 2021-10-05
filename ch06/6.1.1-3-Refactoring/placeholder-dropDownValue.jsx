import {observer} from "mobx-react";
import {action} from "mobx";
import React from "react";

const isMissing = (value) => value === null || value === undefined




export const DropDownValue = observer(({ editState, className, options, placeholderText }) =>
    editState.inEdit
        ? <select
            autoFocus={true}
            value={editState.value}
            style={{ width: Math.max(...options.map((option) => option.length)) + "ch" }}
            onChange={action((event) => {
                editState.setValue(event.target.value)
                editState.inEdit = false
            })}
            onBlur={action((_) => {
                editState.inEdit = false
            })}
            onKeyUp={action((event) => {
                if (event.key === "Escape") {
                    editState.inEdit = false
                }
            })}
            className={className}
        >
            {options.map((option, index) =>
                <option key={index}>{option}</option>
            )}
        </select>
        : <span
            className={className + (isMissing(editState.value) ? " value-missing" : "")}
            onClick={action((_) => {
                editState.inEdit = true
            })}
        >{isMissing(editState.value) ? placeholderText : editState.value}</span>
)
