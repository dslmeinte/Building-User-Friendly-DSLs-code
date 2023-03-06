const { allInstancesOf, isAstReference } = require("../common/ast")


/**
 * Computes all the attributes referenced anywhere within the given AST object and the AST hanging off of it.
 * @param astObject An AST object.
 * @return An array of attribute AST objects - possibly empty.
 */
const referencedAttributesIn = (astObject) => [ ...new Set(     // The JS expression `[ ...new Set(<collection>)]` produces an array of the _unique_ objects within <collection>.
    allInstancesOf("Attribute Reference", astObject)    // Find all __Attribute Reference__s.
        .map((attributeReference) => attributeReference.settings["attribute"])  // Gather the values of their "`property`" setting.
        .filter(isAstReference) // Filter out the ones which are actually AST references.
        .map((refObject) => refObject.ref)  // Follow those references.
) ]
module.exports.referencedAttributesIn = referencedAttributesIn


/**
 * Computes all the attributes referenced anywhere within the value of the given `attribute`.
 * @param attribute An AST object with concept label "Attribute".
 * @return An array of attribute AST objects - possibly empty.
 */
const referencedAttributesInValueOf = (attribute) => referencedAttributesIn(attribute.settings["value"])
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


/**
 * Computes whether the given `attribute` has a "computed as" value.
 * @param attribute An AST object with concept label "Attribute".
 */
const isComputedFromExpression = (attribute) => {
    const { settings } = attribute
    return settings["value"] && settings["value kind"] === "computed as"
}
module.exports.isComputedFromExpression = isComputedFromExpression

