const newId = require("shortid").generate


const rentalPeriodAttribute = {
    id: newId(),
    concept: "Data Attribute",
    settings: {
        "name": "rental period",
        "type": "period in days"
    }
}

const rentalPriceBeforeDiscountInitialValue = {
    id: newId(),
    concept: "Number Literal",
    settings: {
        "value": "0.0"
    }
}
const rentalPriceBeforeDiscountAttribute = {
    id: newId(),
    concept: "Data Attribute",
    settings: {
        "name": "rental price before discount",
        "type": "amount",
        "initial value": rentalPriceBeforeDiscountInitialValue
    }
}

const discountInitialValue = {
    id: newId(),
    concept: "Number Literal",
    settings: {
        "value": "0"
    }
}
const discountAttribute = {
    id: newId(),
    concept: "Data Attribute",
    settings: {
        "name": "discount",
        "type": "percentage",
        "initial value": discountInitialValue
    }
}

const rentalPriceAfterDiscountInitialValue = {
    id: newId(),
    concept: "Attribute Reference",
    settings: {
        "attribute": {
            ref: rentalPriceBeforeDiscountAttribute
        }
    }
}
const rentalPriceAfterDiscountAttribute = {
    id: newId(),
    concept: "Data Attribute",
    settings: {
        "name": "rental price after discount",
        "type": "amount",
        "initial value": rentalPriceAfterDiscountInitialValue
    }
}


const rental = {
    id: newId(),
    concept: "Record Type",
    settings: {
        "name": "Rental",
        "attributes": [
            rentalPeriodAttribute,
            rentalPriceBeforeDiscountAttribute,
            discountAttribute,
            rentalPriceAfterDiscountAttribute
        ]
    }
}


module.exports = rental

