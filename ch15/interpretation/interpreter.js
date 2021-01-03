const { isAstObject } = require("../../ch09/ast")

const evaluate = (value, env) => {
    if (isAstObject(value)) {
        const { settings } = value
        switch (value.concept) {
            case "Attribute Reference": {
                const attributeName = settings["attribute"].ref.settings["name"]
                const given = env["given"]
                return given[attributeName]
            }
            case "Number Literal": return parseFloat(settings["value"])
            case "Binary Operation": {
                const left = parseFloat(evaluate(settings["left"], env))
                const right = parseFloat(evaluate(settings["right"], env))
                switch (settings["operator"]) {
                    case "+": return left + right
                    case "-": return left - right
                    case "*": return left * right
                    case "/": return left / right
                    default: throw Error(`don't know how to evaluate operator '${settings["operator"]}'`)
                }
            }
            default: {
                console.log(`falling through on AST object with concept '${value.concept}'`)
            }
        }
    }
    // Signal "We don't know!"
    return undefined
}


const rental = require("../../ch09/backend/Rental-AST")

const result = evaluate(
    rental.settings["attributes"][4 - 1].settings["value"],
    {
        given: {
            "rental period": "???",
            "rental price before discount": "37.0",
            "discount": "10"
        }
    }
)

console.log(result)

