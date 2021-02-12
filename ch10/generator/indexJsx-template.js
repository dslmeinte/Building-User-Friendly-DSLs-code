const { isAstReference } = require("../ast")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")
const { dependencyOrderOf } = require("./attribute-references-utils")

const initExpressionForInitialValue = (initialValue, objectName) => {
    switch (initialValue.concept) {
        // Application of option 2 to situation 1 of the Exercise of §9.3.2:
        case "Attribute Reference": {
            const targetAttribute = isAstReference(initialValue.settings["attribute"]) && initialValue.settings["attribute"].ref
            return targetAttribute ? `${objectName}.${camelCase(targetAttribute.settings["name"])}` : `/* [GENERATION PROBLEM] attribute reference is undefined */`
        }
        // Application of option 2 to situation 2 of the Exercise of §9.3.2:
        case "Number Literal": {
            const value = initialValue.settings["value"]
            return value === undefined ? `/* [GENERATION PROBLEM] number literal's value is undefined */` : `"${initialValue.settings["value"]}"`
        }
        default: return `/* [GENERATION PROBLEM] initial value of concept "${initialValue.concept}" isn't handled */`
    }
}

const defaultInitExpressionForType = (type) => {
    switch (type) {
        // The first two cases are the result of doing the last Exercise of § 9.3.1:
        case "amount": return `"0.0"`
        case "percentage": return `"0"`
        case "period in days": return `{ from: Date.now(), to: Date.now() }`
        default: return `/* [GENERATION PROBLEM] type "${type}" isn't handled for default initialization expression */`
    }
}

const initAssignment = (attribute, objectName) => {
    const { settings } = attribute
    const value = settings["value"]
    return `${objectName}.${camelCase(settings["name"])} = ${
        value
            ? initExpressionForInitialValue(value, objectName)
            : defaultInitExpressionForType(settings["type"])
    }`
}

const formFieldInput = (type, objectExpr, fieldName) => `<Input type="${type}" object={${objectExpr}} fieldName="${fieldName}" />`

const formFieldInputs = (attribute, objectExpr) => {
    const { settings } = attribute
    const { type } = settings
    const fieldName = camelCase(settings["name"])
    switch (type) {
        case "amount": return "$ " + formFieldInput("number", objectExpr, fieldName)
        case "percentage": return formFieldInput("number", objectExpr, fieldName) + " %"
        case "period in days": return [ "from", "to" ].map((subFieldName) => formFieldInput("date", `${objectExpr}.${fieldName}`, subFieldName))
        default: return `// [GENERATION PROBLEM] type "${type}" isn't handled for form field inputs`
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
import { observable } from "mobx"
import { observer } from "mobx-react"
import { FormField, Input } from "./components"

require("./styling.css")

const new${Name} = () => {
    const ${name} = {}`,
        // Fix the situations of § 9.3.4 and § 9.3.5:
        indent(1)((dependencyOrderOf(attributes) || attributes).map((attribute) => initAssignment(attribute, name))),
        `    return ${name}
}

const ${Name}Form = observer(({ ${name} }) => <div className="form">
    <form>`,
        indent(2)(attributes.map((attribute) => formField(attribute, name))),
        `    </form>
</div>)

const ${name} = observable(new${Name}())

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

