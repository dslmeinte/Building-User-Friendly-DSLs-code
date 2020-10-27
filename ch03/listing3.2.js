// Listing 3.2:

const rentalPeriodAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental period",
        "type": "period in days"
    }
}

const rentalPriceBeforeDiscountInitialValue = {
    concept: "Number Literal",
    settings: {
        "value": "0.0"
    }
}
const rentalPriceBeforeDiscountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental price before discount",
        "type": "amount",
        "initial value": rentalPriceBeforeDiscountInitialValue
    }
}

const discountInitialValue = {
    concept: "Number Literal",
    settings: {
        "value": "0"
    }
}
const discountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "discount",
        "type": "percentage",
        "initial value": discountInitialValue
    }
}

const rentalPriceAfterDiscountInitialValue = {
    concept: "Attribute Reference",
    settings: {
        "attribute": {
            ref: rentalPriceBeforeDiscountAttribute
        }
    }
}
const rentalPriceAfterDiscountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental price after discount",
        "type": "amount",
        "initial value": rentalPriceAfterDiscountInitialValue
    }
}


const rental = {
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


// Added at the start of §3.2, to be able to import the encoded AST elsewhere:
module.exports = rental

