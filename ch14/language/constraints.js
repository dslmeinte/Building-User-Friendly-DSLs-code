const { firstAncestorOfConcept, isAstObject, isAstReference, placeholderAstObject } = require("../common/ast")
const { cycleWith } = require("../generator/dependency-utils")
const { camelCase } = require("../generator/template-utils")
const { attributesAffectedBy, quotedNamesOf, referencedAttributesIn, referencedAttributesInValue } = require("./queries")
const { areEqual, builtInTypes, isNumberType, typeAsText, typeOf } = require("./type-system")
const { isMonth, isWeekDay } = require("./time-units")


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
        case "Business Rule": {
            issueIfNotAstObject("condition", "A business rule must have a condition")
            if (isAstObject(settings["condition"])) {
                const typeOfCondition = typeOf(settings["condition"], [ astObject, ...ancestors ])
                if (!areEqual(typeOfCondition, builtInTypes["boolean"])) {
                    issues.push(`The condition of a business rule must produce a boolean value, but its type is '${typeAsText(typeOfCondition)}'`)
                }
                // Exercise 14.7:
                const affectedAttributes = attributesAffectedBy(firstAncestorOfConcept("Record Type", ancestors).settings["business rules"])
                const inCommon = referencedAttributesIn(settings["condition"]).filter((attribute) => affectedAttributes.indexOf(attribute) > -1)
                if (inCommon.length > 0) {
                    issues.push(`The condition of a business rule must not depend on an attribute affected by any business rule,`
                        + `\n\tbut the following attributes referenced by the condition of this business rule are affected by a business rule:`
                        + `\n\t${quotedNamesOf(inCommon).join(", ")}`)
                }
            }
            issueIfNotAstObject("consequence", "A business rule must have a consequence")
            break
        }
        case "Increment Effect": {
            issueIfNotAstObject("value", "The value must be defined")
            const typeOfValue = typeOf(settings["value"], [ astObject, ...ancestors ])
            const attributeRefObject = settings["attribute reference"].settings["attribute"]
            if (isAstReference(attributeRefObject)) {
                const reffedAttribute = attributeRefObject.ref
                const typeOfReffedAttribute = typeOf(reffedAttribute, [ astObject, ...ancestors ])
                if (!areEqual(typeOfValue, typeOfReffedAttribute)) {
                    issues.push(`The type of the value and the referenced attribute of this effect must match,`
                        + `\n\tbut they are: '${typeAsText(typeOfValue)}', resp., '${typeAsText(typeOfReffedAttribute)}'`)
                }
                if (reffedAttribute.settings["value kind"] !== "initially" || !isAstObject(reffedAttribute.settings["value"])) {
                    issues.push(`An increment effect must reference an attribute with an initial value`)
                }
            }
            break
        }
        case "Interval Operation": {
            issueIfNotAstObject("operand", "The operand must be defined")
            if (isAstObject(settings["operand"])) {
                const typeOfOperand = typeOf(settings["operand"], [ astObject, ...ancestors ])
                if (!areEqual(typeOfOperand, builtInTypes["period in days"])) {
                    issues.push(`The left-hand side (operand) of this operation must be a 'period in days', but it is '${typeAsText(typeOfOperand)}'`)
                }
            }
            issueIfUndefined("operator", "The operator must be defined")
            issueIfUndefined("time unit", "The time unit must be defined")
            const { operator, "time unit": timeUnit } = settings
            if (operator && timeUnit) {
                switch (operator) {
                    case "contains a": {
                        if (!isWeekDay(timeUnit)) {
                            issues.push(`The right-hand side of this operator must be a week day`)
                        }
                        break
                    }
                    case "starts in": {
                        if (!isMonth(timeUnit)) {
                            issues.push(`The right-hand side of this operator must be a month`)
                        }
                        break
                    }
                }
            }
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
                issues.push(`The right operand of this '-' operator has type '${typeAsText(rightType)}', but must have a number type ('amount', or 'percentage')`)
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

