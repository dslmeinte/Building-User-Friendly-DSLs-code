const { newAstObject, astReferenceTo } = require("../common/ast")


const rentalPeriodAttribute = newAstObject("Data Attribute", {
    "name": "rental period",
    "type": "date range"
})

const rentalPriceBeforeDiscountAttribute = newAstObject("Data Attribute", {
    "name": "rental price before discount",
    "type": "amount",
    "initial value": newAstObject("Number", {
        "value": "0.0"
    })
})

const discountAttribute = newAstObject("Data Attribute", {
    "name": "discount",
    "type": "percentage",
    "initial value": newAstObject("Number", {
        "value": "0"
    })
})

const rentalPriceAfterDiscountAttribute = newAstObject("Data Attribute", {
    "name": "rental price after discount",
    "type": "amount",
    "initial value": newAstObject("Attribute Reference", {
        "attribute": astReferenceTo(rentalPriceBeforeDiscountAttribute)
    })
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

