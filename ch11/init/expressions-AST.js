const { newAstObject } = require("../common/ast")
const { binaryOperation, number, parentheses } = require("../language/factories")

const exprAsRow = (expr) => newAstObject("Table Row", { items: [ expr ] })

const exprAst = newAstObject("Table", {
    rows: [
        exprAsRow(binaryOperation("-", number(1), number(2))),
        exprAsRow(binaryOperation("of", number(20), number(5))),
        exprAsRow(binaryOperation("+", number(1), parentheses(binaryOperation("*", number(2), number(3))))),
        exprAsRow(binaryOperation("+", number(1), binaryOperation("*", number(2), number(3)))),
        exprAsRow(binaryOperation("+", binaryOperation("*", number(1), number(2)), number(3))),
        exprAsRow(binaryOperation("+", number(1), binaryOperation("+", number(2), number(3))))
    ]
})


module.exports = exprAst

