const { isAstObject, isAstReference } = require("../common/ast")
const { dependencyOrderOf } = require("../common/dependency-utils")
const { isComputedAttribute, referencedAttributesInValueOf } = require("../language/queries")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")

const expressionFor = (value) => {
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
            return `${expressionFor(settings["left operand"])} ${operator === "of" ? "* 0.01 *" : operator} ${expressionFor(settings["right operand"])}`
        }
        case "Number": {
            const numberValue = settings["value"]
            return numberValue === undefined ? `/* [GENERATION PROBLEM] number's value is undefined */` : `${numberValue}`
        }
        default: return `/* [GENERATION PROBLEM] value of concept "${value.concept}" isn't handled in expressionFor */`
    }
}
module.exports.expressionFor = expressionFor    // (make public to test this function separately)

const defaultInitExpressionForType = (type) => {
    switch (type) {
        case "amount": return `0.0`
        case "date range": return `new DateRange()`
        case "percentage": return `0`
        default: return `/* [GENERATION PROBLEM] type "${type}" isn't handled in defaultInitExpressionForType */`
    }
}

const initializationFor = (attribute) => {
    const { settings } = attribute
    const value = settings["value"]
    return `${camelCase(settings["name"])} = ${
        value
            ? expressionFor(value)
            : defaultInitExpressionForType(settings["type"])
    }`
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
            `    return ${expressionFor(value)}`,
            `}`
        ]
    }
    // Handle an initial (possibly default) value:
    return initializationFor(attribute)
}

const formFieldInput = (type, objectExpr, fieldName) => `<Input type="${type}" object={${objectExpr}} fieldName="${fieldName}" />`

const formFieldInputs = (objectExpr, attribute) => {
    const { settings } = attribute
    const { type } = settings
    const fieldName = camelCase(settings["name"])
    switch (type) {
        case "amount": return "$ " + (isComputedAttribute(attribute) ? `{${objectExpr}.${fieldName}.toFixed(2)}` : formFieldInput("number", objectExpr, fieldName))
        case "date range": return [ "from", "to" ].map((subFieldName) => formFieldInput("date", `${objectExpr}.${fieldName}`, subFieldName))
        case "percentage": return (isComputedAttribute(attribute) ? `{${objectExpr}.${fieldName}}` : formFieldInput("number", objectExpr, fieldName)) + " %"
        default: return `// [GENERATION PROBLEM] type "${type}" isn't handled in formFieldInputs`
    }
}

const formField = (objectExpr, attribute) => [
    `<FormField label="${withFirstUpper(attribute.settings["name"])}">`,
    indent(1)(formFieldInputs(objectExpr, attribute)),
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
import { DateRange } from "./dates"

require("./styling.css")

class ${Name} {`,
        indent(1)(
            (dependencyOrderOf(attributes, referencedAttributesInValueOf) || attributes).map(classField)
        ),
        `    constructor() {
        makeAutoObservable(this)
    }
}

const ${Name}Form = observer(({ ${name} }) => <form>`,
        indent(1)(
            attributes.map((attribute) => formField(name, attribute))
        ),
        `</form>)

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

