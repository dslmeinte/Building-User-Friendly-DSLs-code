const operatorsPerPrecedence = [ [ "-", "+" ], [ "/", "*", "of" ], [ "^" ] ]
const precedenceOfOperator = (operator) => operatorsPerPrecedence.findIndex((opGroup) => opGroup.indexOf(operator) > -1)
module.exports.precedenceOfOperator = precedenceOfOperator  // exported for testing

const associativityOfOperator = (operator) => {
    switch (operator) {
        case "^": return "right"
        default: return "left"
    }
}

const { isAstObject } = require("../ast")

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

