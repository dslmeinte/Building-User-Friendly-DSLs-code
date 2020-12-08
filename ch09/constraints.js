const { isAstReference, placeholderAstObject } = require("./ast")
const { cycleWith, namesOf } = require("./generator/attribute-references-utils")
const { camelCase } = require("./generator/template-utils")

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0

const issuesFor = (astObject, ancestors) => {
    const issues = []
    const { settings } = astObject
    // (Cases are in alphabetical order of concept labels:)
    switch (astObject.concept) {
        case "Attribute Reference": {
            // Application of option 1 to situation 1 of the Exercise of §9.3.2:
            if (!isAstReference(settings["attribute"])) {
                issues.push("The attribute to reference is not yet specified")
            } else {
                // Application of option 1 to the situation of §9.3.3:
                const thisAttribute = ancestors[0]
                const { type: thisType } = thisAttribute.settings
                const { type: otherType, name: otherName } = settings["attribute"].ref.settings
                if (thisType !== undefined && thisType !== otherType) {
                    issues.push(`The types of this attribute and the attribute named '${otherName}' must match,`
                        + `\n\tbut they are: '${thisType}', resp., '${otherType}'`)
                }
            }
            break
        }
        case "Data Attribute": {
            // Application of option 1 to the situation of §9.2:
            if (!isNonEmptyString(settings["name"])) {
                issues.push("An attribute must have a name")
            }
            // Application of option 1 to the situation of §9.3.1:
            if (settings["type"] === undefined) {
                issues.push("An attribute must have a type")
            }
            // Application of option 1 to situation 3 of the Exercise of §9.3.2:
            if (settings["initial value"] === placeholderAstObject) {
                issues.push("The initial value of this attribute is not yet defined")
            }
            // Application of option 1 to the situation of §9.3.5:
            const cycle = cycleWith(astObject)
            if (cycle.length > 0) {
                issues.push("This attribute is part of a cycle through attribute references in initial values:\n\t"
                    + `(${namesOf(cycle).map((name) => `'${name}' -> `).join("")})*`
                )
            }
            // Application of option 1 to the situation of §9.3.6:
            const thisCamelCasedName = camelCase(astObject.settings["name"])
            const similarlyNamed = ancestors[0].settings["attributes"].filter((attribute) =>
                attribute !== astObject && camelCase(attribute.settings["name"]) === thisCamelCasedName
            )
            if (similarlyNamed.length > 0) {
                issues.push("This attribute's name is too similar to the following other attributes' names:\n\t"
                    + namesOf(similarlyNamed).map((name) => `'${name}'`).join(", "))
            }
            break
        }
        case "Number Literal": {
            // Application of option 1 to situation 2 of the Exercise of §9.3.2:
            if (settings["value"] === undefined) {
                issues.push("A number literal must have a value")
            }
            break
        }
        case "Record Type": {
            // Application of option 1 to the last Exercise of §9.2:
            if (!isNonEmptyString(settings["name"])) {
                issues.push("A record type must have a name")
            }
            break
        }
        // No default-case: some concepts might genuinely have no constraints defined on them.
    }
    return issues
}
module.exports.issuesFor = issuesFor

