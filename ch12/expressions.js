/**
 * Helper functions for expressions.
 */

const { astObject, astReferenceTo } = require("./ast")

const attributeReferenceTo = (attribute) => astObject("Attribute Reference", { attribute: astReferenceTo(attribute) })
module.exports.attributeReferenceTo = attributeReferenceTo

const binaryOperation = (operator, left, right) => astObject("Binary Operation", { operator, "left operand": left, "right operand": right })
module.exports.binaryOperation = binaryOperation

const numberLiteral = (value) => astObject("Number Literal", { value: "" + value })
module.exports.numberLiteral = numberLiteral

const parentheses = (expr) => astObject("Parentheses", { sub: expr })
module.exports.parentheses = parentheses

