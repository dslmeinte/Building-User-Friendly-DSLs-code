const { isAstObject } = require("../common/ast")
const { camelCase, withFirstUpper } = require("./template-utils")


const ccNameOf = (namedObject) => camelCase(namedObject.settings["name"])

const expressionFor = (astObject) => {
    const { settings } = astObject
    switch (astObject.concept) {
        case "Attribute Reference": {
            const targetAttribute = settings["attribute"].ref
            return `this.${ccNameOf(targetAttribute)}`
        }
        case "Number": return `${settings["value"]}`
        default: return `/* [GENERATION PROBLEM] value of concept "${astObject.concept}" isn't handled in expressionFor */`
    }
}

const defaultInitExpressionForType = (type) => {
    switch (type) {
        case "date range": return `new DateRange()`
        default: return `/* [GENERATION PROBLEM] type "${type}" isn't handled in defaultInitExpressionForType */`
    }
}

const initializationFor = (attribute) => {
    const { settings } = attribute
    const initialValue = settings["initial value"]
    return `${ccNameOf(attribute)} = ${
        isAstObject(initialValue)
            ? expressionFor(initialValue)
            : defaultInitExpressionForType(settings["type"])
    }`
}

const indexJsx = (recordType) => {
    const name = ccNameOf(recordType)
    const ucName = withFirstUpper(name)
    const { attributes } = recordType.settings

    return `import React from "react"
import { createRoot } from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

import { FormField, Input } from "./components"
import { DateRange } from "./dates"

require("./styling.css")

class ${ucName} {
${attributes.map((attribute) => `    ${initializationFor(attribute)}`).join("\n")}
    constructor() {
        makeAutoObservable(this)
    }
}

const RentalForm = observer(({ rental }) => <form>
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
</form>)

const rental = new Rental()

createRoot(document.getElementById("root"))
    .render(
        <RentalForm rental={rental} />
    )
`
}

module.exports.generatedIndexJsx = indexJsx

