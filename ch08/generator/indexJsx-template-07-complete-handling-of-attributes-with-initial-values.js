const { camelCase, withFirstUpper } = require("./template-utils")

const expressionFor = (value) => {
    const { settings } = value
    switch (value.concept) {
        case "Attribute Reference": {
            const targetAttribute = settings["attribute"].ref
            return `this.${camelCase(targetAttribute.settings["name"])}`
        }
        case "Number Literal": return `${settings["value"]}`
        default: return `/* [GENERATION PROBLEM] value of concept "${value.concept}" isn't handled in expressionFor */`
    }
}

const defaultInitExpressionForType = (type) => {
    switch (type) {
        case "period in days": return `{ from: Date.now(), to: Date.now() }`
        default: return `/* [GENERATION PROBLEM] type "${type}" isn't handled in defaultInitExpressionForType */`
    }
}

const classField = (attribute) => {
    const { settings } = attribute
    const initialValue = settings["initial value"]
    return `${camelCase(settings["name"])} = ${
        initialValue
            ? expressionFor(initialValue)
            : defaultInitExpressionForType(settings["type"])
    }`
}

const indexJsx = (recordType) => {
    const name = camelCase(recordType.settings["name"])
    const Name = withFirstUpper(name)
    const { attributes } = recordType.settings

    return `import React from "react"
import { render } from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { FormField, Input } from "./components"

require("./styling.css")

class ${Name} {
${attributes.map((attribute) => `    ${classField(attribute)}`).join("\n")}
    constructor() {
        makeAutoObservable(this)
    }
}

const RentalForm = observer(({ rental }) => <div className="form">
    <form>
        <FormField label="Rental period">
            <Input type="date" object={rental.rentalPeriod} fieldName="from" />
            <Input type="date" object={rental.rentalPeriod} fieldName="to" />
        </FormField>
        <FormField label="Rental price before discount">
            $ <Input type="number" object={rental} fieldName="rentalPriceBeforeDiscount" />
        </FormField>
        <FormField label="Discount">
            <Input type="number" object={rental} fieldName="discount" /> %
        </FormField>
        <FormField label="Rental price after discount">
            $ <Input type="number" object={rental} fieldName="rentalPriceAfterDiscount" />
        </FormField>
    </form>
</div>)

const rental = new Rental()

const App = observer(() => <div>
    <RentalForm rental={rental} />
</div>)

render(
    <App />,
    document.getElementById("root")
)
`
}

module.exports.generatedIndexJsx = indexJsx

