const { isAstObject, isAstReference } = require("../common/ast")

/**
 * Computes all the attributes referenced anywhere within the value of the given `attribute`.
 * @param attribute An AST object with concept label "Attribute".
 * @return An array of attribute AST objects - possibly empty.
 */
const referencedAttributesInValueOf = (attribute) => {
    const value = attribute.settings["value"]
    if (isAstObject(value) && value.concept === "Attribute Reference") {
        const refObject = value.settings["attribute"]
        return isAstReference(refObject) ? [ refObject.ref ] : []
    }
    return []
}
module.exports.referencedAttributesInValueOf = referencedAttributesInValueOf


/**
 * @param astObject - an AST object with a string-valued "name" property.
 * @return the name of the given AST object (as a string), with (single) quotes around it.
 */
const nameOf = (astObject) => astObject.settings["name"]
const quote = (str) => `'${str}'`
/**
 * @param astObjects An array of AST objects with a string-valued "name" property.
 * @return An array of names (strings), with (single) quotes around them.
 */
const quotedNamesOf = (astObjects) => astObjects.map(nameOf).map(quote)
module.exports.quotedNamesOf = quotedNamesOf

