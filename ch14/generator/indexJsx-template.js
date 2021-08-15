const { isAstObject, isAstReference } = require("../common/ast")
const { requiresParentheses } = require("../language/operators")
const { attributesAffectedBy, isComputedFromExpression, referencedAttributesInValue } = require("../language/queries")
const { dependencyOrderOf } = require("./dependency-utils")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")


const jsOperatorFor = (operator) => {
    switch (operator) {
        case "of": return "* 0.01 *"
        case "^": return "**"
        default: return operator
    }
}

const intervalOperator2methodName = {
    "contains a": "containsWeekDay",
    "starts in": "startsInMonth"
}

const jsNameFor = (attribute) => camelCase(attribute.settings["name"])

const expressionFor = (value, ancestors) => {
    if (!isAstObject(value)) {
        return `/* [GENERATION PROBLEM] value "${value}" isn't handled in expressionFor */`
    }
    const { settings } = value
    switch (value.concept) {
        case "Attribute Reference": {
            const targetAttribute = isAstReference(settings["attribute"]) && settings["attribute"].ref
            return targetAttribute ? `this.${jsNameFor(targetAttribute)}` : `/* [GENERATION PROBLEM] attribute reference is undefined */`
        }
        case "Binary Operation": {
            const { operator } = settings
            const nextAncestors = [ value, ...ancestors ]
            const withoutParentheses = `${expressionFor(settings["left operand"], nextAncestors)} ${jsOperatorFor(operator)} ${expressionFor(settings["right operand"], nextAncestors)}`
            return requiresParentheses(value, ancestors[0]) ? `(${withoutParentheses})` : withoutParentheses
        }
        case "Interval Operation": {
            const { operand, operator, "time unit": timeUnit } = settings
            return `${expressionFor(operand)}.${intervalOperator2methodName[operator]}("${timeUnit}")`
        }
        case "Number": {
            const numberValue = settings["value"]
            return numberValue === undefined ? `/* [GENERATION PROBLEM] number's value is undefined */` : numberValue
        }
        case "Parentheses": return `(${expressionFor(settings["sub"], [ value, ...ancestors ])})`
        default: return `/* [GENERATION PROBLEM] value of concept "${value.concept}" isn't handled in expressionFor */`
    }
}
module.exports.expressionFor = expressionFor    // (make public to test this function separately)

const defaultInitExpressionForType = (type) => {
    switch (type) {
        case "amount": return `0.0`
        case "percentage": return `0`
        case "period in days": return `new Period()`
        default: return `/* [GENERATION PROBLEM] type "${type}" isn't handled in defaultInitExpressionForType */`
    }
}

const initializationFor = (attribute) => {  // TODO  back-propagate that we make this into a separate function already in chapter 8
    const { settings } = attribute
    const value = settings["value"]
    return `${(jsNameFor(attribute))} = ${
        isAstObject(value)
            ? expressionFor(value, [])
            : defaultInitExpressionForType(settings["type"])
    }`
}

const consequenceAsStatement = (consequence) => {
    if (!isAstObject(consequence)) {
        return `/* [GENERATION PROBLEM] value "${consequence}" isn't handled in consequenceAsStatement */`
    }
    const { settings } = consequence
    switch (consequence.concept) {
        case "Effect": return `${jsNameFor(settings["attribute reference"].settings["attribute"].ref)} += ${expressionFor(settings["value"])}`
        default: return `/* [GENERATION PROBLEM] value of concept "${consequence.concept}" isn't handled in consequenceAsStatement */`
    }
}

const businessRuleAsStatement = (businessRule) => {
    const { settings } = businessRule
    return [
        `if (${expressionFor(settings["condition"], [])}) {`,
        indent(1)(consequenceAsStatement(settings["consequence"])),
        `}`
    ]
}

const classField = (attribute, isAffected) => {
    const { settings } = attribute
    const value = settings["value"]
    const fieldName = jsNameFor(attribute)
    if (isAffected) {
        return [
            `get ${fieldName}() {`,
            `    return this.rulesEffects.${fieldName}`,
            `}`
        ]
    }
    if (isComputedFromExpression(attribute)) {
        return [
            `get ${fieldName}() {`,
            `    return ${expressionFor(value, [])}`,
            `}`
        ]
    }
    return initializationFor(attribute)
}

const formFieldInput = (type, objectExpr, fieldName) => `<Input type="${type}" object={${objectExpr}} fieldName="${fieldName}" />`

const formFieldInputs = (objectExpr, attribute, isAffected) => {
    const { settings } = attribute
    const { type } = settings
    const fieldName = jsNameFor(attribute)
    const isComputed = isAffected || isComputedFromExpression(attribute)
    switch (type) {
        case "amount": return "$ " + (isComputed ? `{${objectExpr}.${fieldName}.toFixed(2)}` : formFieldInput("number", objectExpr, fieldName))
        case "percentage": return (isComputed ? `{${objectExpr}.${fieldName}}` : formFieldInput("number", objectExpr, fieldName)) + " %"
        case "period in days": return [ "from", "to" ].map((subFieldName) => formFieldInput("date", `${objectExpr}.${fieldName}`, subFieldName))
        default: return `// [GENERATION PROBLEM] type "${type}" isn't handled in formFieldInputs`
    }
}

const formField = (objectExpr, attribute, isAffected) => [
    `<FormField label="${withFirstUpper(attribute.settings["name"])}">`,
    indent(1)(formFieldInputs(objectExpr, attribute, isAffected)),
    `</FormField>`
]

const indexJsx = (recordType) => {
    const name = jsNameFor(recordType)
    const Name = withFirstUpper(name)
    const { attributes, "business rules": businessRules } = recordType.settings
    const affectedAttributes = attributesAffectedBy(businessRules)
    const isAffected = (attribute) => affectedAttributes.indexOf(attribute) > -1
    // Exercise 14:10 (commented-out again):
    // console.dir(affectedAttributes)
    // console.log(isAffected(attributes[2]))  // == "discount" attribute

    return [
        `import React from "react"
import { render } from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

import { FormField, Input } from "./components"
import { Period } from "./dates"

require("./styling.css")

class ${Name} {`,
        indent(1)(
            (dependencyOrderOf(attributes, referencedAttributesInValue) || attributes)
                .map((attribute) => classField(attribute, isAffected(attribute)))
        ),
        `    get rulesEffects() {`,
        indent(2)(affectedAttributes.map((attribute) => `let ${initializationFor(attribute)}`)),
        indent(2)(businessRules.map(businessRuleAsStatement)),
        `        return {`,
        indent(3)(affectedAttributes.map(jsNameFor)),
        `        }
    }
    constructor() {
        makeAutoObservable(this)
    }
}

const ${Name}Form = observer(({ ${name} }) => <form>`,
        indent(1)(
            attributes.map((attribute) => formField(name, attribute, isAffected(attribute)))
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

