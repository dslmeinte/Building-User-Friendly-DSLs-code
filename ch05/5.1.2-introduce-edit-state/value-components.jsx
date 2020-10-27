import React from "react"


export const TextValue = ({ editState }) =>
    editState.inEdit
        ? <input type="text"
            defaultValue={editState.value}
            autoFocus={true}
        />
        : <span className="value"
            onClick={(_) => {
                editState.inEdit = true
            }}
        >{editState.value}</span>

