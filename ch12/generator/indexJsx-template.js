const { isAstObject, isAstReference } = require("../common/ast")
const { dependencyOrderOf } = require("../common/dependency-utils")
const { requiresParentheses } = require("../language/operators")
const { isComputedAttribute, referencedAttributesInValueOf } = require("../language/queries")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")

const jsOperatorFor = (operator) => {
    switch (operator) {
        case "of": return "* 0.01 *"
        // Exercise 12.8:
        case "^": return "**"
        default: return operator
    }
}

const expressionFor = (astObject, ancestors) => {
    if (!isAstObject(astObject)) {
        return `/* [GENERATION PROBLEM] value "${astObject}" isn't handled in expressionFor */`
    }
    const { settings } = astObject
    switch (astObject.concept) {
        case "Attribute Reference": {
            const targetAttribute = isAstReference(settings["attribute"]) && settings["attribute"].ref
            return targetAttribute ? `this.${camelCase(targetAttribute.settings["name"])}` : `/* [GENERATION PROBLEM] attribute reference is undefined */`
        }
        case "Binary Operation": {
            const { operator } = settings
            // Exercise 12.5:
            const nextAncestors = [ astObject, ...ancestors ]
            const withoutParentheses = `${expressionFor(settings["left operand"], nextAncestors)} ${jsOperatorFor(operator)} ${expressionFor(settings["right operand"], nextAncestors)}`
            return requiresParentheses(astObject, ancestors[0]) ? `(${withoutParentheses})` : withoutParentheses
        }
        case "Number": {
            const numberValue = settings["value"]
            return numberValue === undefined ? `/* [GENERATION PROBLEM] number's value is undefined */` : `${numberValue}`
        }
        // Implementation of Exercise 12.1:
        case "Parentheses": return `(${expressionFor(settings["sub"], [ astObject, ...ancestors ])})`
        default: return `/* [GENERATION PROBLEM] value of concept "${astObject.concept}" isn't handled in expressionFor */`
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
        isAstObject(value)
            ? expressionFor(value, [])
            : defaultInitExpressionForType(settings["type"])
    }`
}

const classField = (attribute) => {
    const { settings } = attribute
    const value = settings["value"]
    const fieldName = camelCase(settings["name"])
    // Handle a computed value:
    if (isComputedAttribute(attribute)) {
        return [
            `get ${fieldName}() {`,
            `    return ${expressionFor(value, [])}`,
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

