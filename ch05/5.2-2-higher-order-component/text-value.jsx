
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
