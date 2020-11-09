const indexJsx = (recordType) => {
    return `import React from "react"
import { render } from "react-dom"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { FormField, Input } from "./components"

require("./styling.css")

const newRental = () => {
    const rental = {}
    rental.rentalPeriod = { from: Date.now(), to: Date.now() }
    rental.rentalPriceBeforeDiscount = "0.0"
    rental.discount = "0"
    rental.rentalPriceAfterDiscount = rental.rentalPriceBeforeDiscount
    return rental
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

const rental = observable(newRental())

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

