const { isAstObject } = require("../common/ast")

// The operators is ascending order of precedence:
const operatorsPerPrecedence = [ [ "-", "+" ], [ "/", "*", "of" ], [ "^" ] ]
/**
 * Computes an integer rank for the operator precedence.
 * @param operator A {string} with an operator.
 * @return {number} an integer rank for the operator precedence of the `operator`.
 */
const precedenceOfOperator = (operator) => operatorsPerPrecedence.findIndex((opGroup) => opGroup.indexOf(operator) > -1)
module.exports.precedenceOfOperator = precedenceOfOperator  // (exported for testing)

/**
 * An array of all the binary operators (effectively in ascending order of precedence).
 */
const allOperators = operatorsPerPrecedence.flat()
module.exports.allOperators = allOperators

const associativityOfOperator = (operator) => {
    switch (operator) {
        case "^": return "right"
        default: return "left"
    }
}

/**
 * Determines whether the given `expr` needs virtual, "show-only" parentheses around it,
 * so that the projection of `parent` matches the order of operations.
 * @param expr An AST object.
 * @param parent The parent of the `expr` AST object.
 * @return {boolean}
 */
const requiresParentheses = (expr, parent) => {
    if (!(isAstObject(parent) && parent.concept === "Binary Operation")) {
        return false
    }
    const precExpr = precedenceOfOperator(expr.settings["operator"])
    const precParent = precedenceOfOperator(parent.settings["operator"])
    return precParent > precExpr || (
        precExpr === precParent && expr === parent.settings[associativityOfOperator(expr.settings["operator"]) + " operand"]
    )
}
module.exports.requiresParentheses = requiresParentheses

