const { astObject } = require("../ast")
const { attributeReferenceTo, binaryOperation, numberLiteral } = require("../expressions")

const rentalPeriodAttribute = astObject("Attribute", {
    "name": "rental period",
    "type": "period in days"
})

const rentalPriceBeforeDiscountAttribute = astObject("Attribute", {
    "name": "rental price before discount",
    "type": "amount",
    "value": numberLiteral("0.0"),
    "value kind": "initially"
})

const discountAttribute = astObject("Attribute", {
    "name": "discount",
    "type": "percentage",
    "value": numberLiteral("0"),
    "value kind": "initially"
})

const rentalPriceAfterDiscountAttribute = astObject("Attribute", {
    "name": "rental price after discount",
    "type": "amount",
    "value": binaryOperation("-", attributeReferenceTo(rentalPriceBeforeDiscountAttribute), binaryOperation("of", attributeReferenceTo(discountAttribute), attributeReferenceTo(rentalPriceBeforeDiscountAttribute))),
    "value kind": "computed as"
})


const rental = astObject("Record Type", {
    "name": "Rental",
    "attributes": [
        rentalPeriodAttribute,
        rentalPriceBeforeDiscountAttribute,
        discountAttribute,
        rentalPriceAfterDiscountAttribute
    ]
})


module.exports = rental

