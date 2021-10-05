const indexJsx = (recordType) => {
    return `import React from "react"
import { render } from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

import { FormField, Input } from "./components"
import { DateRange } from "./dates"

require("./styling.css")

class Rental {
    rentalPeriod = new DateRange()
    rentalPriceBeforeDiscount = 0.0
    discount = 0
    rentalPriceAfterDiscount = this.rentalPriceBeforeDiscount
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

