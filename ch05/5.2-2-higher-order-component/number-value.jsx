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
