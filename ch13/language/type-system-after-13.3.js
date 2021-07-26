const { isAstObject, isAstReference } = require("../common/ast")
const { camelCase } = require("../generator/template-utils")


const typeObject = (name, concept, settings) => ({
    id: camelCase(concept) + "_" + camelCase(name),
    concept,
    settings: settings || {}
})

const numberTypeConceptLabel = "Number Type"
const numberType = (name, unit) => typeObject(name, numberTypeConceptLabel, { unit })
const isNumberType = (typeObject) => typeObject.concept === numberTypeConceptLabel
module.exports.isNumberType = isNumberType


const untypeName = "Untype"
const untype = typeObject(untypeName, untypeName)
module.exports.untype = untype


const builtInTypes = {
    "amount": numberType("amount", "$"),
    "percentage": numberType("percentage", "%"),
    "period in days": typeObject("period in days", "Interval Type", { unit: "day" }),
    [untypeName]: untype
}
module.exports.builtInTypes = builtInTypes


/**
 * Returns `true` when the two given type objects are equal.
 * (Equality is ID-based.)
 */
const areEqual = (actual, expected) => actual.id === expected.id
module.exports.areEqual = areEqual


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

const typeOfAttribute = (attribute) => builtInTypes[attribute.settings["type"]]

const typeOf = (astObject, ancestors) => {
    if (!isAstObject(astObject)) {
        return untype
    }
    const { settings } = astObject
    const nextAncestors = [ astObject, ...ancestors ]
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
                case "day": return "period in days"
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

