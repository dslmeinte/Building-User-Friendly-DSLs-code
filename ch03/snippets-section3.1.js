/*
 * The following snippets of code correspond to the snippets in the running text of section 3.1 of chapter 3,
 * so the ones without a numbered caption.
 * I'll lead each separate one in with a comment line with a short explanation about what it does/represents.
 */


// Encode the AST object with concept label "Record Type":

const rental = {
    concept: "Record Type"
}


// Encode its name as well, using a settings object:

const rental = {
    concept: "Record Type",
    settings: {
        "name": "Rental"
    }
}

// § 3.1.1. Encoding containment relations.

// Encode the first attribute AST object:

const rentalPeriodAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental period",
        "type": "date range"
    }
}


// Retrofit the encoding of the "Rental" AST object to contain the first attribute object:

const rental = {
    concept: "Record Type",
    settings: {
        "name": "Rental",
        "attributes": [ rentalPeriodAttribute ]
    }
}


// Encode all attributes objects, and contain them in the "Rental" object:

const rentalPeriodAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental period",
        "type": "date range"
    }
}
const rentalPriceBeforeDiscountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental price before discount",
        "type": "amount"
    }
}
const discountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "discount",
        "type": "percentage"
    }
}
const rentalPriceAfterDiscountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental price after discount",
        "type": "amount"
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


// Encode the initial values of attributes 2 and 3, and retrofit the encodings of those to contain the initial values:

const rentalPriceBeforeDiscountInitialValue = {
    concept: "Number",
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
    concept: "Number",
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


// § 3.1.2. Encoding reference relations.

// First attempt to encode the initial value of attribute 4, which is problematic:

const rentalPriceAfterDiscountInitialValue = {
    concept: "Attribute Reference",
    settings: {
        "attribute": rentalPriceBeforeDiscountAttribute
    }
}


// Encode the initial value object for attribute 4 correctly:

const rentalPriceAfterDiscountInitialValue = {
    concept: "Attribute Reference",
    settings: {
        "attribute": {
            ref: rentalPriceBeforeDiscountAttribute
        }
    }
}


// Patch the encoding of attribute 4 accordingly:

const rentalPriceAfterDiscountAttribute = {
    concept: "Data Attribute",
    settings: {
        "name": "rental price after discount",
        "type": "amount",
        "initial value": rentalPriceAfterDiscountInitialValue
    }
}


