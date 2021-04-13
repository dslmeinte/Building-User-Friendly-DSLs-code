const { isAstObject, isAstReference } = require("../ast")
const { requiresParentheses } = require("../operators")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")
const { dependencyOrderOf, isComputedAttribute } = require("./attribute-utils")

const jsOperatorFor = (operator) => {
    switch (operator) {
        case "of": return "* 0.01 *"
        // Exercise 12.8:
        case "^": return "**"
        default: return operator
    }
}

const expressionFor = (value, ancestors) => {
    if (!isAstObject(value)) {
        return `/* [GENERATION PROBLEM] value "${value}" isn't handled in expressionFor */`
    }
    const { settings } = value
    switch (value.concept) {
        case "Attribute Reference": {
            const targetAttribute = isAstReference(settings["attribute"]) && settings["attribute"].ref
            return targetAttribute ? `this.${camelCase(targetAttribute.settings["name"])}` : `/* [GENERATION PROBLEM] attribute reference is undefined */`
        }
        case "Binary Operation": {
            const { operator } = settings
            // Exercise 12.5:
            const newAncestors = [ value, ...ancestors ]
            const withoutParentheses = `${expressionFor(settings["left operand"], newAncestors)} ${jsOperatorFor(operator)} ${expressionFor(settings["right operand"], newAncestors)}`
            return requiresParentheses(value, ancestors[0]) ? `(${withoutParentheses})` : withoutParentheses
        }
        case "Number Literal": {
            const numberValue = settings["value"]
            return numberValue === undefined ? `/* [GENERATION PROBLEM] number literal's value is undefined */` : numberValue
        }
        // Implementation of Exercise 12.1:
        case "Parentheses": return `(${expressionFor(settings["sub"], [ value, ...ancestors ])})`
        default: return `/* [GENERATION PROBLEM] value of concept "${value.concept}" isn't handled in expressionFor */`
    }
}
module.exports.expressionFor = expressionFor    // (make public to test this function separately)

const defaultInitExpressionForType = (type) => {
    switch (type) {
        case "amount": return `0.0`
        case "percentage": return `0`
        case "period in days": return `{ from: Date.now(), to: Date.now() }`
        default: return `/* [GENERATION PROBLEM] type "${type}" isn't handled in defaultInitExpressionForType */`
    }
}

const classField = (attribute) => {
    const { settings } = attribute
    const value = settings["value"]
    const fieldName = camelCase(settings["name"])
    // Handle a computed value:
    if (isComputedAttribute(attribute)) {
        return `get ${fieldName}() {
    return ${expressionFor(value, [])}
}`
    }
    // Handle an initial (possibly default) value:
    return `${fieldName} = ${
        value
            ? expressionFor(value, [])
            : defaultInitExpressionForType(settings["type"])
    }`
}

const formFieldInput = (type, objectExpr, fieldName) => `<Input type="${type}" object={${objectExpr}} fieldName="${fieldName}" />`

const formFieldInputs = (attribute, objectExpr) => {
    const { settings } = attribute
    const { type } = settings
    const fieldName = camelCase(settings["name"])
    switch (type) {
        case "amount": return "$ " + (isComputedAttribute(attribute) ? `{${objectExpr}.${fieldName}.toFixed(2)}` : formFieldInput("number", objectExpr, fieldName))
        case "percentage": return (isComputedAttribute(attribute) ? `{${objectExpr}.${fieldName}}` : formFieldInput("number", objectExpr, fieldName)) + " %"
        case "period in days": return [ "from", "to" ].map((subFieldName) => formFieldInput("date", `${objectExpr}.${fieldName}`, subFieldName))
        default: return `// [GENERATION PROBLEM] type "${type}" isn't handled in formFieldInputs`
    }
}

const formField = (attribute, objectExpr) => [
    `<FormField label="${withFirstUpper(attribute.settings["name"])}">`,
    indent(1)(formFieldInputs(attribute, objectExpr)),
    `</FormField>`
]

const indexJsx = (recordType) => {
    const name = camelCase(recordType.settings["name"])
    const Name = withFirstUpper(name)
    const { attributes } = recordType.settings

    return [
        `import React from "react"
import { render } from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { FormField, Input } from "./components"

require("./styling.css")

class ${Name} {`,
        indent(1)((dependencyOrderOf(attributes) || attributes).map(classField)),
        `    constructor() {
        makeAutoObservable(this)
    }
}

const ${Name}Form = observer(({ ${name} }) => <div className="form">
    <form>`,
        indent(2)(attributes.map((attribute) => formField(attribute, name))),
        `    </form>
</div>)

const ${name} = new ${Name}()

const App = observer(() => <div>
    <${Name}Form ${name}={${name}} />
</div>)

render(
    <App />,
    document.getElementById("root")
)
`
    ]
}

module.exports.generatedIndexJsx = (ast) => asString(indexJsx(ast))

