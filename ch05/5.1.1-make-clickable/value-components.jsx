import React from "react"


export const TextValue = ({ value }) =>
    <span className="value"
        onClick={(_) => {
                alert(`Editing of value "${value}" started!`)
            }}
    >{value}</span>

