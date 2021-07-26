const { isAstObject, isAstReference, placeholderAstObject } = require("../common/ast")
const { cycleWith } = require("../generator/dependency-utils")
const { camelCase } = require("../generator/template-utils")
const { quotedNamesOf, referencedAttributesInValue } = require("./queries")
const { areEqual, isNumberType, typeAsText, typeOf } = require("./type-system")


const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0

const issuesFor = (astObject, ancestors) => {
    const issues = []
    const { settings } = astObject
    const issueIfUndefined = (propertyName, message) => {
        if (settings[propertyName] === undefined) {
            issues.push(message)
        }
    }
    const issueIfNotAstObject = (propertyName, message) => {
        const value = settings[propertyName]
        if (!isAstObject(value)) {
            issues.push(message)
        }
    }
    const issueIfEmpty = (propertyName, message) => {
        if (!isNonEmptyString(settings["name"])) {
            issues.push(message)
        }
    }

    // (Cases are in alphabetical order of concept labels:)
    switch (astObject.concept) {
        case "Attribute": {
            issueIfEmpty("name", "An attribute must have a name")
            issueIfUndefined("type", "An attribute must have a type")
            if (settings["value"] === placeholderAstObject) {
                issues.push("The value of this attribute is not yet defined")
            }
            if (isAstObject(settings["value"])) {
                const typeOfAttribute = typeOf(astObject, ancestors)
                const typeOfValue = typeOf(settings["value"], [ astObject, ...ancestors ])
                if (!areEqual(typeOfAttribute, typeOfValue)) {
                    issues.push(`The types of this attribute and its value must match,`
                        + `\n\tbut they are: '${typeAsText(typeOfAttribute)}', resp., '${typeAsText(typeOfValue)}'`)
                }
            }
            const cycle = cycleWith(astObject, referencedAttributesInValue)
            if (cycle.length > 0) {
                issues.push("This attribute is part of a cycle through attribute references in attributes' values:\n\t"
                    + quotedNamesOf(cycle).join(" -> ") + " -> [go back to first]..."
                )
            }
            const thisCamelCasedName = camelCase(astObject.settings["name"])
            const similarlyNamed = ancestors[0].settings["attributes"].filter((attribute) =>
                attribute !== astObject && camelCase(attribute.settings["name"]) === thisCamelCasedName
            )
            if (similarlyNamed.length > 0) {
                issues.push("This attribute's name is too similar to the following other attributes' names:\n\t"
                    + quotedNamesOf(similarlyNamed).join(", ")
                )
            }
            break
        }
        case "Attribute Reference": {
            if (!isAstReference(settings["attribute"])) {
                issues.push("The attribute to reference is not yet specified")
            }
            break
        }
        case "Binary Operation": {
            issueIfNotAstObject("left operand", "The left operand must be defined")
            issueIfUndefined("operator", "The operator must be defined")
            issueIfNotAstObject("right operand", "The right operand must be defined")
            issues.push(...typeIssuesForBinaryOperator(astObject, ancestors))
            break
        }
        case "Number": {
            issueIfUndefined("value", "The number's value must be defined")
            break
        }
        case "Parentheses": {
            issueIfNotAstObject("sub", "The sub expression must be defined")
            break
        }
        case "Record Type": {
            issueIfEmpty("name", "A record type must have a name")
            break
        }
        // No default-case: some concepts might genuinely have no constraints defined on them.
    }
    return issues
}
module.exports.issuesFor = issuesFor


/**
 * Computes the issues for the given binary operation AST object.
 * @param binaryOperation An AST object of concept __Binary Operation__.
 * @param ancestors An array of the ancestors of the `binaryOperation` AST object, in anti-chronological order.
 * @return {string[]} An array with the messages of all issues due to type checking constraints on the given binary operation.
 */
const typeIssuesForBinaryOperator = (binaryOperation, ancestors) => {
    const issues = []
    const { settings } = binaryOperation
    const nextAncestors = [ binaryOperation, ...ancestors ]
    const leftType = typeOf(settings["left operand"], nextAncestors)
    const rightType = typeOf(settings["right operand"], nextAncestors)
    switch (settings["operator"]) {
        case "-": {
            if (!isNumberType(leftType)) {
                issues.push(`The left operand of this '-' operator has type '${typeAsText(leftType)}', but must have a number type ('amount', or 'percentage')`)
            }
            if (!isNumberType(rightType)) {
                issues.push(`The left operand of this '-' operator has type '${typeAsText(rightType)}', but must have a number type ('amount', or 'percentage')`)
            }
            if (!areEqual(leftType, rightType)) {
                issues.push(`The types of both operands of this '-' operator differ (left '${typeAsText(leftType)}' vs. '${typeAsText(rightType)}' right), but must be the same`)
            }
            break
        }
        case "of": {
            if (!areEqual(leftType, builtInTypes["percentage"])) {
                issues.push(`The left operand of this 'of' operator has type '${typeAsText(leftType)}', but must have type 'percentage'`)
            }
            if (!areEqual(rightType, builtInTypes["amount"])) {
                issues.push(`The right operand of this 'of' operator has type '${typeAsText(rightType)}', but must have type 'amount'`)
            }
            break
        }
        default: {
            console.warn(`no type constraints checking implemented for binary operation with operator '${settings["operator"]}'`)
        }
    }
    return issues
}

