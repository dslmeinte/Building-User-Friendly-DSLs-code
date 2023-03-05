import React from "react"
import { createRoot } from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

import { FormField, Input } from "./components"
import { DateRange } from "./dates"

require("./styling.css")

class Rental {
    rentalPeriod = new DateRange()
    rentalPriceBeforeDiscount = 0.0
    get discount() {
        return this.rulesEffects.discount
    }
    get rentalPriceAfterDiscount() {
        return this.rentalPriceBeforeDiscount - this.discount * 0.01 * this.rentalPriceBeforeDiscount
    }
    get rulesEffects() {
        let discount = 0
        if (this.rentalPeriod.containsWeekDay("Saturday")) {
            discount += 10
        }
        if (this.rentalPeriod.startsInMonth("December")) {
            discount += 5
        }
        return {
            discount
        }
    }
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
        {rental.discount} %
    </FormField>
    <FormField label="Rental price after discount">
        $ {rental.rentalPriceAfterDiscount.toFixed(2)}
    </FormField>
</form>)

const rental = new Rental()

createRoot(document.getElementById("root"))
    .render(
        <RentalForm rental={rental} />
    )
