import {action} from "mobx"
import {observer} from "mobx-react"
import React from "react"

export const FormField = observer(({ id, label, children }) => <div className="row">
    <div className="label">
        <label>{label}</label>
    </div>
    <div className="field">
        {children}
    </div>
</div>)

export const Input = observer(({ type, object, fieldName }) => <input
    type={type}
    value={object[fieldName]}
    onChange={action((event) => { object[fieldName] = event.target.value })}
/>)

