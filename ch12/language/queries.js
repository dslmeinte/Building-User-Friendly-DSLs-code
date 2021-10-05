const { isAstObject, isAstReference } = require("../common/ast")

/**
 * Computes an array from merging all elements in left and right occurring uniquely.
 */
const mergeUniquely = (left, right) => [ ...new Set([ ...left, ...right ]) ]

/**
 * Computes all the attributes referenced anywhere within the value of the given `attribute`.
 * @param attribute An AST object with concept label "Attribute".
 * @return An array of attribute AST objects - possibly empty.
 */
const referencedAttributesInValueOf = (attribute) => {
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
            case "Number":
                return []
            case "Parentheses":
                return reffedAttribs(settings["sub"])
            default:
                throw new Error(`referencedAttributesIn(..) doesn't handle instances of the concept '${expr.concept}'`)
        }
    }

    return reffedAttribs(attribute.settings["value"])
}
module.exports.referencedAttributesInValueOf = referencedAttributesInValueOf


/**
 * @param astObject - an AST object with a string-valued "name" property.
 * @return the name of the given AST object (as a string), with (single) quotes around it.
 */
const nameOf = (astObject) => astObject.settings["name"]
module.exports.nameOf = nameOf

const quote = (str) => `'${str}'`
/**
 * @param astObjects An array of AST objects with a string-valued "name" property.
 * @return An array of names (strings), with (single) quotes around them.
 */
const quotedNamesOf = (astObjects) => astObjects.map(nameOf).map(quote)
module.exports.quotedNamesOf = quotedNamesOf


// Exercise 11.9:
/**
 * Computes whether the given `attribute` has a "computed as" value.
 * @param attribute An AST object with concept label "Attribute".
 */
const isComputedAttribute = (attribute) => {
    const { settings } = attribute
    return settings["value"] && settings["value kind"] === "computed as"
}
module.exports.isComputedAttribute = isComputedAttribute

