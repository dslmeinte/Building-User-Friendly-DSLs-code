const { isAstObject, isAstReference } = require("../common/ast")
const { camelCase } = require("../generator/template-utils")


const typeObject = (name, concept, settings) => ({  // Define a factory function for type objects. The first argument is the type's name.
    id: camelCase(concept) + "_" + camelCase(name), // Generate a stable ID from the type's concept label and name.
    concept,
    settings: settings || {}
})

const numberTypeConceptLabel = "Number Type"
const numberType = (name, unit) => typeObject(name, numberTypeConceptLabel, { unit })
const isNumberType = (typeObject) => typeObject.concept === numberTypeConceptLabel
module.exports.isNumberType = isNumberType


const untypeName = "Untype"
/**
 * A type that indicates that type computation was unsuccessful.
 */
const untype = typeObject(untypeName, untypeName)
module.exports.untype = untype


/**
 * A map from names of built-in types to their corresponding (singleton) type objects.
 */
const builtInTypes = {
    "amount": numberType("amount", "$"),
    "date range": typeObject("date range", "Interval Type", { unit: "day" }),
    "percentage": numberType("percentage", "%"),
    [untypeName]: untype
}
module.exports.builtInTypes = builtInTypes


/**
 * Returns `true` when the two given type objects are equal.
 * (Equality is ID-based.)
 */
const areEqual = (actual, expected) => actual.id === expected.id
module.exports.areEqual = areEqual


/**
 * Computes the effective type of a binary operation with given operator, and operands of the given left and right types.
 * Returns the "untype" in case of an unhandled operator (in which case a warning is logged to the console as well).
 */
const typeOfBinaryOperation = (operator, leftType, rightType) => {
    switch (operator) {
        case "-": {
            if (isNumberType(leftType)) {
                return leftType
            }
            if (areEqual(leftType, untype) && isNumberType(rightType)) {
                return rightType
            }
            return untype
        }
        case "of": return areEqual(rightType, builtInTypes["amount"]) ? rightType : untype
        default: return untype
    }
}
module.exports.typeOfBinaryOperation = typeOfBinaryOperation    // export for test only


const typeOfAttribute = (attribute) =>
    builtInTypes[attribute.settings["type"]] || untype


/**
 * Tries to compute the _effective type_ of the given `value` (which should be an AST object).
 * Returns an AST object which describes the effective type.
 * @param astObject The value to compute the effective type of - should be an AST object.
 * @param ancestors An array with all the ancestors of `value`, in anti-chronological order.
 * @return An AST object which describes the effective type.
 */
const typeOf = (astObject, ancestors) => {
    if (!isAstObject(astObject)) {
        return untype
    }
    const { settings } = astObject
    const nextAncestors = [ astObject, ...ancestors ]    // Pre-compute the reversed array of ancestors for any child of the current AST object.
    switch (astObject.concept) {
        case "Attribute": return typeOfAttribute(astObject)
        case "Attribute Reference": return isAstReference(settings["attribute"])
            ? typeOfAttribute(settings["attribute"].ref)
            : untype
        case "Binary Operation": {
            const leftType = typeOf(settings["left operand"] , nextAncestors)
            const rightType = typeOf(settings["right operand"] , nextAncestors)
            return typeOfBinaryOperation(settings["operator"], leftType, rightType)
        }
        case "Number": {
            if (ancestors.length === 0) {
                return untype
            }
            const parent = ancestors[0]
            if (parent.concept === "Attribute") {
                return typeOfAttribute(parent)
            }
            return untype
        }
        case "Parentheses": return typeOf(settings["sub"] , ancestors)
        // Exercise 13.11:
        case "Record Type": return astObject    // A record type is its own type object.
        default: return untype
    }
}
module.exports.typeOf = typeOf


/**
 * Computes a textual representation of the given type object.
 * @param typeObject A type object.
 */
const typeAsText = (typeObject) => {
    const { settings } = typeObject
    switch (typeObject.concept) {
        case "Interval Type": {
            switch (settings["unit"]) {
                case "day": return "date range"
                default: return `Interval Type(unit='${settings["unit"]}')`
            }
        }
        case numberTypeConceptLabel: {
            switch (settings["unit"]) {
                case "$": return "amount"
                case "%": return "percentage"
                default: return `Number Type(unit='${settings["unit"]}')`
            }
        }
        case "Record Type": return `record type “${settings["name"]}”`
        case "Time Type": return `unit of time '${settings["unit"]}'`
        case untypeName: return `untype`
        default: return `type object(concept='${typeObject.concept}', ???)`
    }
}
module.exports.typeAsText = typeAsText

