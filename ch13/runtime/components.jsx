import React from "react"
import { action } from "mobx"
import { observer } from "mobx-react"

import { formatDate } from "./dates"


export const FormField = observer(({ label, children }) => <div className="row">
    <label>{label}</label>
    <div className="field">
        {children}
    </div>
</div>)


const convertToType = (newValue /*: string from onChange's event.target.value */, type) => {
    switch (type) {
        case "number": return Number.parseFloat(newValue)
        case "date": return new Date(newValue)
        default: return newValue
    }
}

const convertFromType = (value, type) => {
    switch (type) {
        case "number": return "" + value
        case "date": return formatDate(value)
        default: return value
    }
}

export const Input = observer(({ type, object, fieldName }) => <input
    type={type}
    value={convertFromType(object[fieldName], type)}
    onChange={action((event) => {
        object[fieldName] = convertToType(event.target.value, type)
    })}
/>)

/*
 * Note: HTML's input element uses the format "yyyy-mm-dd" when type="date"
 */

