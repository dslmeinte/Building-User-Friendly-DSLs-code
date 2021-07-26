const { newAstObject } = require("../common/ast")
const { attributeReferenceTo, binaryOperation, number } = require("../language/factories")

const rentalPeriodAttribute = newAstObject("Attribute", {
    "name": "rental period",
    "type": "period in days"
})

const rentalPriceBeforeDiscountAttribute = newAstObject("Attribute", {
    "name": "rental price before discount",
    "type": "amount",
    "value": number("0.0"),
    "value kind": "initially"
})

const discountAttribute = newAstObject("Attribute", {
    "name": "discount",
    "type": "percentage",
    "value": number("0"),
    "value kind": "initially"
})

const rentalPriceAfterDiscountAttribute = newAstObject("Attribute", {
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

