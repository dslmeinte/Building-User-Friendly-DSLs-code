const { newAstObject } = require("../common/ast")
const { attribute, attributeReferenceTo, binaryOperation, businessRule, dateRangeOperation, incrementEffect, number } = require("../language/factories")


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

const businessRule1 = businessRule(
    dateRangeOperation(attributeReferenceTo(rentalPeriodAttribute), "contains a", "Saturday"),
    incrementEffect(number(10), discountAttribute)
)

const businessRule2 = businessRule(
    dateRangeOperation(attributeReferenceTo(rentalPeriodAttribute), "starts in", "December"),
    incrementEffect(number(5), discountAttribute)
)

const rental = newAstObject("Record Type", {
    "name": "Rental",
    "attributes": [
        rentalPeriodAttribute,
        rentalPriceBeforeDiscountAttribute,
        discountAttribute,
        rentalPriceAfterDiscountAttribute
    ],
    "business rules": [
        businessRule1,
        businessRule2
    ]
})


module.exports = rental

