const { isAstObject, isAstReference } = require("../ast")

/**
 * Computes an array from merging all elements in left and right occurring uniquely.
 */
const mergeUniquely = (left, right) => [ ...new Set([ ...left, ...right ]) ]

/**
 * Computes all the attributes referenced anywhere within the value of the given attribute.
 * @param attribute - an AST object with concept label "Attribute".
 * @return {*[]} an array of attribute AST objects - possibly empty, specifically when expr is not an (expression) AST object
 */
const referencedAttributesIn = (attribute) => {

    const reffedAttribs = (expr) => {
        if (!isAstObject(expr)) {
            return []
        }
        const { settings } = expr
        switch (expr.concept) {
            case "Attribute Reference":
                return isAstReference(settings["attribute"]) ? [ settings["attribute"].ref ] : []
            case "Binary Operation":
                return mergeUniquely(reffedAttribs(settings["left operand"]), reffedAttribs(settings["right operand"]))
            case "Number Literal":
                return []
            case "Parentheses":
                return reffedAttribs(settings["sub"])
            default:
                throw new Error(`referencedAttributesIn(..) doesn't handle instances of the concept '${expr.concept}'`)
        }
    }

    return reffedAttribs(attribute.settings["value"])
}


/**
 * @param attribute - an AST object with concept label "Attribute".
 * @returns an array with a cycle of attributes through attribute references in values, starting at the given attribute.
 *  An array of length 0 means: the given attribute is not part of any cycle.
 */
const cycleWith = (attribute) => {

    const visit = (current, chain) => {
        if (chain.indexOf(current) > -1) {
            // Add current to end, so we know what sub-array constitutes the actual cycle:
            return [ ...chain, current ]
        }
        const extendedChain = [ ...chain, current ]
        for (const reffedAttribute of referencedAttributesIn(current)) {
            const recursion = visit(reffedAttribute, extendedChain)
            if (recursion.length > 0) {
                return recursion
            }
        }
        return []
    }

    const result = visit(attribute, [])
    return result.length > 0 && result[result.length - 1] === attribute ? result : []
}
module.exports.cycleWith = cycleWith


/**
 * @param attributes - an array of AST objects with concept label "Attribute".
 * @returns an array of the same AST objects, in dependency order (assuming all references attributes are in the given array),
 *  or false when there's a cycle.
 */
const dependencyOrderOf = (attributes) => {
    const ordered = []

    const visit = (current, chain) => {
        if (ordered.indexOf(current) > -1) {
            return false
        }
        if (chain.indexOf(current) > -1) {
            return true
        }
        const extendedChain = [ ...chain, current ]
        const hasCycle = referencedAttributesIn(current).some(
            (reffedAttrib) => visit(reffedAttrib, extendedChain)
        )
        ordered.push(current)
        return hasCycle
    }

    const hasCycle = attributes.some(
        (attribute) => visit(attribute, [])
    )

    return hasCycle ? false : ordered     // equivalent to: !hasCycle && ordered
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


const isComputedAttribute = (attribute) => {
    const { settings } = attribute
    return settings["value"] && settings["value kind"] === "computed as"
}
module.exports.isComputedAttribute = isComputedAttribute

