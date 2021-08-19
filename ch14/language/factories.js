/**
 * Helper functions for expressions.
 */

const { astReferenceTo, newAstObject } = require("../common/ast")

const attributeReferenceTo = (attribute) => newAstObject("Attribute Reference", { attribute: astReferenceTo(attribute) })
module.exports.attributeReferenceTo = attributeReferenceTo

const attribute = (settings) => newAstObject("Attribute", settings)
module.exports.attribute = attribute

const binaryOperation = (operator, left, right) => newAstObject("Binary Operation", { operator, "left operand": left, "right operand": right })
module.exports.binaryOperation = binaryOperation

const businessRule = (condition, consequence) => newAstObject("Business Rule", { condition, consequence })
module.exports.businessRule = businessRule

const incrementEffect = (value, reffedattribute) => newAstObject("Increment Effect", { value, "attribute reference": attributeReferenceTo(reffedattribute) })
module.exports.incrementEffect = incrementEffect

const intervalOperation = (operand, operator, timeUnit) => newAstObject("Interval Operation", { operand, operator, "time unit": timeUnit })
module.exports.intervalOperation = intervalOperation

const number = (value) => newAstObject("Number", { value: "" + value })
module.exports.number = number

const parentheses = (expr) => newAstObject("Parentheses", { sub: expr })
module.exports.parentheses = parentheses

