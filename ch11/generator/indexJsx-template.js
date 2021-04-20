const { isAstObject, isAstReference } = require("../ast")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")
const { dependencyOrderOf, isComputedAttribute } = require("./attribute-utils")

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
        // Exercise 11.9:
        case "Binary Operation": {
            const { operator } = settings
            const newAncestors = [ value, ...ancestors ]
            return `${expressionFor(settings["left operand"], newAncestors)} ${operator === "of" ? "* 0.01 *" : operator} ${expressionFor(settings["right operand"], newAncestors)}`
        }
        case "Number Literal": {
            const numberValue = settings["value"]
            return numberValue === undefined ? `/* [GENERATION PROBLEM] number literal's value is undefined */` : `${numberValue}`
        }
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
    // Exercise 11.9:
    // Handle a computed value:
    if (isComputedAttribute(attribute)) {
        return [
            `get ${fieldName}() {`,
            `    return ${expressionFor(value, [])}`,
            `}`
        ]
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

