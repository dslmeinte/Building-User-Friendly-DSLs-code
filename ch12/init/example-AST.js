const { newAstObject } = require("../common/ast")
const { attribute, attributeReferenceTo, binaryOperation, number } = require("../language/factories")


const rentalPeriodAttribute = attribute({
    "name": "rental period",
    "type": "date range"
})

const rentalPriceBeforeDiscountAttribute = attribute({
    "name": "rental price before discount",
    "type": "amount",
    "value": number("0.0"),
    "value kind": "initially"
})

const discountAttribute = attribute({
    "name": "discount",
    "type": "percentage",
    "value": number("0"),
    "value kind": "initially"
})

const rentalPriceAfterDiscountAttribute = attribute({
    "name": "rental price after discount",
    "type": "amount",
    "value": binaryOperation("-", attributeReferenceTo(rentalPriceBeforeDiscountAttribute), binaryOperation("of", attributeReferenceTo(discountAttribute), attributeReferenceTo(rentalPriceBeforeDiscountAttribute))),
    "value kind": "computed as"
})


const rental = newAstObject("Record Type", {
    "name": "Rental",
    "attributes": [
        rentalPeriodAttribute,
        rentalPriceBeforeDiscountAttribute,
        discountAttribute,
        rentalPriceAfterDiscountAttribute
    ]
})


module.exports = rental

