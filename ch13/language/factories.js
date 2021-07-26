/**
 * Helper functions for expressions.
 */

const { astReferenceTo, newAstObject } = require("../common/ast")

const attributeReferenceTo = (attribute) => newAstObject("Attribute Reference", { attribute: astReferenceTo(attribute) })
module.exports.attributeReferenceTo = attributeReferenceTo

const binaryOperation = (operator, left, right) => newAstObject("Binary Operation", { operator, "left operand": left, "right operand": right })
module.exports.binaryOperation = binaryOperation

const number = (value) => newAstObject("Number", { value: "" + value })
module.exports.number = number

const parentheses = (expr) => newAstObject("Parentheses", { sub: expr })
module.exports.parentheses = parentheses

