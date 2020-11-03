const { readFile, writeFileSync } = require("fs")
const { join } = require("path")
const { deserialize } = require("../ast")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")

const options = { encoding: "utf8" }

const astPath = join(__dirname, "../backend/contents.json")
const indexJsxPath = join(__dirname, "../runtime/index.jsx")

const initExpressionForExpression = (initialValue, objectName) => {
    switch (initialValue.concept) {
        case "Attribute Reference": {
            const targetAttribute = initialValue.settings["attribute"].ref
            return `${objectName}.${camelCase(targetAttribute.settings["name"])}`
        }
        case "Number Literal": return `"${initialValue.settings["value"]}"`
        default: return `// [GENERATION PROBLEM] initial value of concept "${initialValue.concept}" isn't handled`
    }
}

const defaultInitExpressionForType = (type) => {
    switch (type) {
        case "period in days": return `{ from: Date.now(), to: Date.now() }`
        default: return `// [GENERATION PROBLEM] type "${type}" isn't handled`
    }
}

const initAssignment = (attribute, objectName) => {
    const { settings } = attribute
    const initialValue = settings["initial value"]
        return `${objectName}.${camelCase(settings["name"])} = ${
        initialValue
            ? initExpressionForExpression(initialValue, objectName)
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
        default: return `// src/generator/generator.js#formFieldInputs(..) doesn't handle type "${type}"`
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
        indent(1)(attributes.map((attribute) => initAssignment(attribute, name))),
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


require("../../../src/frontend/grayscale")

`
    ]
}

readFile(astPath, options, (_, data) => {
    const serializedAst = JSON.parse(data)
    const deserializedAst = deserialize(serializedAst)
    writeFileSync(indexJsxPath, asString(indexJsx(deserializedAst)), options)
})

