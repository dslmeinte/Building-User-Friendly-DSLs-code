const { isAstObject, isAstReference } = require("../common/ast")
const { dependencyOrderOf } = require("../common/dependency-utils")
const { requiresParentheses } = require("../language/operators")
const { attributesAffectedBy, isComputedFromExpression, referencedAttributesInValueOf } = require("../language/queries")
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")


const ccNameOf = (namedObject) => camelCase(namedObject.settings["name"])

const jsOperatorFor = (operator) => {
    switch (operator) {
        case "of": return "* 0.01 *"
        case "^": return "**"
        default: return operator
    }
}

const dateRangeOperator2methodName = {
    "contains a": "containsWeekDay",
    "starts in": "startsInMonth"
}

const expressionFor = (astObject, ancestors) => {
    if (!isAstObject(astObject)) {
        return `/* [GENERATION PROBLEM] value "${astObject}" isn't handled in expressionFor */`
    }
    const { settings } = astObject
    switch (astObject.concept) {
        case "Attribute Reference": {
            const targetAttribute = isAstReference(settings["attribute"]) && settings["attribute"].ref
            return targetAttribute ? `this.${ccNameOf(targetAttribute)}` : `/* [GENERATION PROBLEM] attribute reference is undefined */`
        }
        case "Binary Operation": {
            const { operator } = settings
            const nextAncestors = [ astObject, ...ancestors ]
            const withoutParentheses = `${expressionFor(settings["left operand"], nextAncestors)} ${jsOperatorFor(operator)} ${expressionFor(settings["right operand"], nextAncestors)}`
            return requiresParentheses(astObject, ancestors[0]) ? `(${withoutParentheses})` : withoutParentheses
        }
        case "Date Range Operation": {
            const { operand, operator, "time unit": timeUnit } = settings
            return `${expressionFor(operand)}.${dateRangeOperator2methodName[operator]}("${timeUnit}")`
        }
        case "Number": {
            const numberValue = settings["value"]
            return numberValue === undefined ? `/* [GENERATION PROBLEM] number's value is undefined */` : `${numberValue}`
        }
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
    return `${ccNameOf(attribute)} = ${
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
        case "Increment Effect": return `${ccNameOf(settings["attribute reference"].settings["attribute"].ref)} += ${expressionFor(settings["value"])}`
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
    const fieldName = ccNameOf(attribute)
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
    const fieldName = ccNameOf(attribute)
    const isComputed = isAffected || isComputedFromExpression(attribute)
    switch (type) {
        case "amount": return "$ " + (isComputed ? `{${objectExpr}.${fieldName}.toFixed(2)}` : formFieldInput("number", objectExpr, fieldName))
        case "date range": return [ "from", "to" ].map((subFieldName) => formFieldInput("date", `${objectExpr}.${fieldName}`, subFieldName))
        case "percentage": return (isComputed ? `{${objectExpr}.${fieldName}}` : formFieldInput("number", objectExpr, fieldName)) + " %"
        default: return `// [GENERATION PROBLEM] type "${type}" isn't handled in formFieldInputs`
    }
}

const formField = (objectExpr, attribute, isAffected) => [
    `<FormField label="${withFirstUpper(attribute.settings["name"])}">`,
    indent(1)(formFieldInputs(objectExpr, attribute, isAffected)),
    `</FormField>`
]

const indexJsx = (recordType) => {
    const name = ccNameOf(recordType)
    const ucName = withFirstUpper(name)
    const { attributes, "business rules": businessRules } = recordType.settings
    const affectedAttributes = attributesAffectedBy(businessRules)
    const isAffected = (attribute) => affectedAttributes.indexOf(attribute) > -1
    // Exercise 14.11 (commented-out again):
    // console.dir(affectedAttributes)
    // console.log(isAffected(attributes[2]))  // == "discount" attribute

    return [
        `import React from "react"
import { createRoot } from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

import { FormField, Input } from "./components"
import { DateRange } from "./dates"

require("./styling.css")

class ${ucName} {`,
        indent(1)(
            (dependencyOrderOf(attributes, referencedAttributesInValueOf) || attributes)
                .map((attribute) => classField(attribute, isAffected(attribute)))
        ),
        `    get rulesEffects() {`,
        indent(2)(affectedAttributes.map((attribute) => `let ${initializationFor(attribute)}`)),
        indent(2)(businessRules.map(businessRuleAsStatement)),
        `        return {`,
        indent(3)(affectedAttributes.map(ccNameOf)),
        `        }
    }
    constructor() {
        makeAutoObservable(this)
    }
}

const ${ucName}Form = observer(({ ${name} }) => <form>`,
        indent(1)(
            attributes.map(
                (attribute) => formField(name, attribute, isAffected(attribute))
            )
        ),
        `</form>)

const ${name} = new ${ucName}()

createRoot(document.getElementById("root"))
    .render(
        <${ucName}Form ${name}={${name}} />
    )
`
    ]
}

module.exports.generatedIndexJsx = (ast) => asString(indexJsx(ast))

