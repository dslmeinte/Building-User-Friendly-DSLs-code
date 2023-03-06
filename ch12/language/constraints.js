const { isAstObject, isAstReference, placeholderAstObject } = require("../common/ast")
const { cycleWith } = require("../common/dependency-utils")
const { quotedNamesOf, referencedAttributesInValueOf } = require("./queries")
const { camelCase } = require("../generator/template-utils")

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0

const issuesFor = (astObject, ancestors) => {
    const issues = []
    const { settings } = astObject

    const issueIfEmpty = (propertyName, message) => {
        if (!isNonEmptyString(settings[propertyName])) {
            issues.push(message)
        }
    }
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

    // (Cases are in alphabetical order of concept labels:)
    switch (astObject.concept) {

        case "Attribute": {
            issueIfEmpty("name", "An attribute must have a name")
            issueIfUndefined("type", "An attribute must have a type")
            if (settings["value"] === placeholderAstObject) {
                issues.push("The value of this attribute is not yet defined")
            }
            const cycle = cycleWith(astObject, referencedAttributesInValueOf)
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
            } else {
                const thisAttribute = ancestors[0]
                const { type: thisType } = thisAttribute.settings
                const { type: otherType, name: otherName } = settings["attribute"].ref.settings
                if (thisType !== undefined && thisType !== otherType) {
                    issues.push(`The types of this attribute and the attribute named '${otherName}' must match,`
                        + `\n\tbut they are: '${thisType}', resp., '${otherType}'`
                    )
                }
            }
            break
        }

        case "Binary Operation": {
            issueIfNotAstObject("left operand", "The left operand must be defined")
            issueIfUndefined("operator", "The operator must be defined")
            issueIfNotAstObject("right operand", "The right operand must be defined")
            break
        }

        case "Number": {
            issueIfUndefined("value", "The number's value must be defined")
            break
        }

        // Exercise 12.1:
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

