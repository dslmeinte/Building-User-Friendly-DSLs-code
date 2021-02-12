const { isAstReference } = require("../ast")

/**
 * @param attribute - an AST object with concept label "Data Attribute".
 * @returns {boolean|*} the attribute referenced through an attribute reference in the attribute's initial value, or false.
 */
const referencedAttributeOrFalse = (attribute) => {
    const initialValue = attribute.settings["value"]
    if (initialValue && initialValue.concept === "Attribute Reference") {
        const refObject = initialValue.settings["attribute"]
        return isAstReference(refObject) && refObject.ref
    }
    return false
}


/**
 * @param attribute - an AST object with concept label "Data Attribute".
 * @returns an array with the cycle of attributes through attribute references in initial values, starting at the given attribute.
 *  An array of length 0 means: the given attribute is not part of a cycle.
 */
const cycleWith = (attribute) => {
    const chain = []
    let current = attribute
    while (current && chain.indexOf(current) === -1) {
        chain.push(current)
        current = referencedAttributeOrFalse(current)
    }
    return chain[0] === current ? chain : []
}
module.exports.cycleWith = cycleWith


/**
 * @param attributes - an array of AST objects with concept label "Data Attribute".
 * @returns an array of the same AST objects, in dependency order (assuming all references attributes are in the given array),
 *  or false when there's a cycle.
 */
const dependencyOrderOf = (attributes) => {
    const ordered = []

    for (const attribute of attributes) {
        if (ordered.indexOf(attribute) > -1) {    // (We've encountered this attribute before.)
            continue
        }

        // Follow the chain in arrow-order:
        const chain = []
        let current = attribute
        // Stop when the chain stops, or when we find an attribute that we encountered before:
        while (current && ordered.indexOf(current) === -1) {
            // Check whether we entered a cycle:
            if (chain.indexOf(current) > -1) {
                return false
            }
            chain.push(current)
            current = referencedAttributeOrFalse(current)
        }
        // Append the chain in reverse order to the dependency order:
        ordered.push(...chain.reverse())

    }

    return ordered
}
module.exports.dependencyOrderOf = dependencyOrderOf


/**
 * @param astObjects - an array of AST objects with a string-valued "name" property.
 * @return an array of names (strings), with (single) quotes around them.
 */
const nameOf = (astObject) => astObject.settings["name"]
const quote = (str) => `'${str}'`
const quotedNamesOf = (astObjects) => astObjects.map(nameOf).map(quote)
module.exports.quotedNamesOf = quotedNamesOf

