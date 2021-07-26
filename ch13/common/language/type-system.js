const { isAstObject, isAstReference } = require("../ast")
const { camelCase } = require("../../generator/template-utils")


const typeObject = (name, concept, settings) => ({  // Define a factory function for type objects. The first argument is supposed to be the type's name.
    id: "$type_" + camelCase(name), // Generate a stable ID from the type's name.
    concept,
    settings: settings || {}
})

/**
 * Returns `true` when the two given type objects are equal.
 * (Equality is ID-based.)
 */
const areEqual = (actual, expected) => actual.id === expected.id
module.exports.areEqual = areEqual


const numberTypeConceptLabel = "Number Type"
const numberType = (name, unit) => typeObject(name, numberTypeConceptLabel, { name, unit })
const isNumberType = (typeObject) => typeObject.concept === numberTypeConceptLabel


/**
 * A map from data type names to their corresponding (singleton) data type literal AST objects.
 */
const dataTypes = {
    "amount": numberType("amount", "$"),
    "number": numberType("number", "-"),    // Define the unitless number type, values of which can be converted to the other two number types, defined next.
    "percentage": numberType("percentage", "%"),
    "period in days": typeObject("period in days", "Interval Type", { unit: "day" })
}
module.exports.dataTypes = dataTypes


const unknownTypeName = "Unknown Type"
/**
 * A type that indicates that the type computation was unsuccessful.
 */
const unknownType = typeObject("$type_" + camelCase(unknownTypeName), unknownTypeName)
module.exports.unknownType = unknownType
// TODO  rename to something better, like "Untypable"?


/**
 * Computes the effective type of a binary operation with given operator, and operands of the given left and right types.
 * Returns the unknown type in case of an unhandled operator (in which case a warning is logged to the console as well).
 */
const typeOfBinaryOperation = (operator, leftType, rightType) => {
    switch (operator) {
        case "+":
        case "-":
            return [ leftType, rightType, dataTypes["number"] ].find(isNumberType)     // See specification.
        case "*": {
            if (!isNumberType(leftType) || areEqual(leftType, dataTypes["number"])) {
                return isNumberType(rightType) ? rightType : dataTypes["number"]
            }
            if (areEqual(leftType, dataTypes["amount"]) || areEqual(leftType, dataTypes["percentage"])) {
                return leftType
            }
            return unknownType  // Never happens, but return the unknown type nevertheless, to avoid fallthrough-problems.
        }
        case "/": {
            if (!isNumberType(leftType) || areEqual(leftType, dataTypes["number"])) {
                return dataTypes["number"]
            }
            if (areEqual(leftType, dataTypes["amount"]) || areEqual(leftType, dataTypes["percentage"])) {
                return areEqual(rightType, leftType) ? dataTypes["number"] : leftType // In division, two amounts and percentage cancel each other out to just a number.
            }
            return unknownType  // Never happens, but return the unknown type nevertheless, to avoid fallthrough-problems.
        }
        case "of":
            return areEqual(rightType, dataTypes["amount"]) ? dataTypes["amount"] : dataTypes["number"]    // Keep $, or assume "`number`".
        default: {
            console.warn(`no type computation implemented for binary operation with operator "${operator}" - returning the unknown type`)
            return unknownType
        }
    }
}
module.exports.typeOfBinaryOperation = typeOfBinaryOperation    // export for test only


const typeOfAttribute = (attribute) => dataTypes[attribute.settings["type"]]


/**
 * Tries to compute the _effective type_ of the given `value` (which should be an AST object).
 * Returns an AST object which describes the effective type.
 * @param value The value to compute the effective type of - should be an AST object.
 * @param ancestors An array with all the ancestors of `value`, in anti-chronological order.
 * @return {*|{settings: *, concept: *, id: string}|undefined} an AST object which describes the effective
 */
const typeOf = (value, ancestors) => {
    const t = (value, ancestors, untypable) => {    // Define an inner function, named `t`, that takes an extra argument that keeps track of AST objects that have already been deemed to be untypable.
        if (untypable.indexOf(value) > -1) {    // If `value` is already deemed to be untypable, we can immediately return `undefined`.
            return unknownType
        }
        if (isAstObject(value)) {
            const {settings} = value
            const nextAncestors = [ value, ...ancestors ]    // Pre-compute the reversed array of ancestors for any child of the current AST object.
            switch (value.concept) {
                case "Attribute":
                    return typeOfAttribute(value)
                case "Attribute Reference":
                    return isAstReference(settings["attribute"]) ? typeOfAttribute(settings["attribute"].ref) : unknownType
                case "Binary Operation": {
                    const leftType = t(settings["left operand"], nextAncestors, untypable)
                    const rightType = t(settings["right operand"], nextAncestors, untypable)
                    return typeOfBinaryOperation(settings["operator"], leftType, rightType)
                }
                case "Number": {
                    if (ancestors.length === 0) {
                        return unknownType
                    }
                    const parent = ancestors[0]
                    if (parent.concept === "Attribute") {
                        return typeOfAttribute(parent)
                    }
                    if (parent.concept === "Binary Operation") {
                        return (parent.settings["operator"] === "of" && parent.settings["left operand"] === value)  // Check whether the current value is the left operand of an "`**of**`"-operation.
                            ? dataTypes["percentage"]    // If so, the left operand of a binary operation is _assumed_ to be a percentage, even when its computed effective type differs.
                            : t(parent, ancestors.slice(1), [ value, ...untypable ])
                            /*
                             * If not, compute the type of the parent, also passing _its_ ancestors: the ancestors of the current AST object, minus the parent (which is the first array element) itself.
                             * We also add the current AST object to the array of untypable objects, to avoid that we enter an infinite recursion.
                             */
                    }
                    return unknownType
                }
                case "Parentheses": return t(settings["sub"], nextAncestors, untypable)
                case "Record Type": return value    // A record type is its own type literal.
                default:
                    return unknownType
            }
        }
        return unknownType
    }
    return t(value, ancestors, [])
}
module.exports.typeOf = typeOf


/**
 * Computes the issues for the given binary operation AST object.
 * @param binaryOperation An AST object of concept __Binary Operation__.
 * @param ancestors An array of the ancestors of the `binaryOperation` AST object, in anti-chronological order.
 * @return {string[]} An array with the messages of all issues due to type checking constraints on the given binary operation.
 */
const typeIssuesForBinaryOperator = (binaryOperation, ancestors) => {
    const issues = []
    const { settings } = binaryOperation
    const nextAncestors = [ binaryOperation, ...ancestors ]
    const leftType = typeOf(settings["left operand"], nextAncestors)
    const rightType = typeOf(settings["right operand"], nextAncestors)
    const { operator } = settings
    if (isNumberType(leftType) && isNumberType(rightType)) {    // Right now, all binary operators have numbers as operands - that's going to change in the future!
        const leftUnit = leftType.settings["unit"]
        const rightUnit = rightType.settings["unit"]
        switch (operator) {
            case "+":
            case "-": {
                if (!(leftUnit === rightUnit)) {
                    issues.push(`The units of the number(-typed) operands of this binary operation with a ${operator} operator must be the same, but are: "${leftUnit}" (left) vs. "${rightUnit}" (right)`)
                }
                break
            }
            case "*": {
                if (!(leftUnit === "-" || rightUnit === "-")) {
                    issues.push(`At least one of the operands of this binary ${operator} operation must be a unitless number`)
                }
                break
            }
            case "/": {
                if (!(leftUnit === rightUnit || rightUnit === "-")) {
                    issues.push(`The units of the number(-typed) operands of this binary ${operator} operation must be equal, or the right operand must be a unitless number`)
                }
                break
            }
            case "of": {
                if (!(leftUnit === "%")) {
                    issues.push(`The left operand of a binary 'of' operation must be a percentage`)
                }
                if (!(rightUnit === "-" || rightUnit === "$")) {
                    issues.push(`The right operand of a binary 'of' operation must be a unitless number, or an amount`)
                }
                break
            }
            default: {
                console.warn(`no type constraints checking implemented for binary operation with operator "${operator}"`)
            }
        }
    } else {
        issues.push(`Both operands of an "of"-operation must be numbers`)
    }
    return issues
}
module.exports.typeIssuesForBinaryOperator = typeIssuesForBinaryOperator


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
                case "-": return "number"
                case "$": return "amount"
                case "%": return "percentage"
                default: return `Number Type(unit='${settings["unit"]}')`
            }
        }
        case "Record Type": return `record type “${settings["name"]}”`
        case "Time Type": return `unit of time '${settings["unit"]}'`
        case unknownTypeName: return `unknown type`
        default: return `type object(concept='${typeObject.concept}', ???)`
    }
}
module.exports.typeAsText = typeAsText

