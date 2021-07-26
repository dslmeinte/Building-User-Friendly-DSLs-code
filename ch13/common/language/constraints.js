const { isAstObject, isAstReference, placeholderAstObject } = require("../ast")
const { cycleWith, quotedNamesOf } = require("../../generator/attribute-utils")
const { camelCase } = require("../../generator/template-utils")
const { areEqual, typeAsText, typeIssuesForBinaryOperator, typeOf } = require("./type-system")

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0

const issuesFor = (astObject, ancestors) => {
    const issues = []
    const { settings } = astObject
    const checkIsDefined = (propertyName, message) => {
        if (settings[propertyName] === undefined) {
            issues.push(message)
        }
    }
    const checkIsReallyDefined = (propertyName, message) => {
        const value = settings[propertyName]
        if (!isAstObject(value)) {
            issues.push(message)
        }
    }
    const checkIsNonEmptyString = (propertyName, message) => {
        if (!isNonEmptyString(settings["name"])) {
            issues.push(message)
        }
    }

    // (Cases are in alphabetical order of concept labels:)
    switch (astObject.concept) {
        case "Attribute": {
            checkIsNonEmptyString("name", "An attribute must have a name")
            checkIsDefined("type", "An attribute must have a type")
            if (settings["value"] === placeholderAstObject) {
                issues.push("The value of this attribute is not yet defined")
            }
            if (isAstObject(settings["value"])) {
                const newAncestors = [ astObject, ...ancestors ]
                const typeOfAttribute = typeOf(astObject, newAncestors)
                const typeOfValue = typeOf(settings["value"], newAncestors)
                if (!areEqual(typeOfAttribute, typeOfValue)) {
                    issues.push(`The types of this attribute and its value must match,`
                        + `\n\tbut they are: '${typeAsText(typeOfAttribute)}', resp., '${typeAsText(typeOfValue)}'`)
                }
            }
            const cycle = cycleWith(astObject)
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
            checkIsReallyDefined("left operand", "The left operand must be defined")
            checkIsDefined("operator", "The operator must be defined")
            checkIsReallyDefined("right operand", "The right operand must be defined")
            issues.push(...typeIssuesForBinaryOperator(astObject, ancestors))
            break
        }
        case "Number": {
            checkIsDefined("value", "A number literal must have a value")
            break
        }
        case "Parentheses": {
            checkIsReallyDefined("sub", "The sub expression must be defined")
            break
        }
        case "Record Type": {
            checkIsNonEmptyString("name", "A record type must have a name")
            break
        }
        // No default-case: some concepts might genuinely have no constraints defined on them.
    }
    return issues
}
module.exports.issuesFor = issuesFor

