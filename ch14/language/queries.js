const { allInstancesOf, isAstObject, isAstReference } = require("../common/ast")


/**
 * Computes all the attributes referenced anywhere within the given AST object and the AST hanging off of it.
 * @param astObject An AST object.
 * @return An array of attribute AST objects - possibly empty.
 */
const referencedAttributesIn = (astObject) => [ ...new Set(     // `[ ...new Set(__<collection>__)]` ensures that we end up with an array of _unique_ AST object.
    allInstancesOf("Attribute Reference", astObject)    // Find all __Attribute Reference__s.
        .map((attributeReference) => attributeReference.settings["attribute"])  // Gather the values of their "`property`" setting.
        .filter(isAstReference) // Filter the ones which are actually AST references.
        .map((refObject) => refObject.ref)  // Follow those references.
) ]
module.exports.referencedAttributesIn = referencedAttributesIn

/**
 * Computes all the attributes referenced anywhere within the value of the given `attribute`.
 * @param attribute An AST object with concept label "Attribute".
 * @return An array of attribute AST objects - possibly empty.
 */
const referencedAttributesInValue = (attribute) => referencedAttributesIn(attribute.settings["value"])
module.exports.referencedAttributesInValue = referencedAttributesInValue


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


/**
 * Determines an array of attributes that are affected by the given effectful consequence.
 */
const affectedAttributesInConsequence = (consequence) => {
    if (!isAstObject(consequence)) {
        return []
    }
    const { settings } = consequence
    switch (consequence.concept) {
        case "Effect": return referencedAttributesIn(settings["attribute reference"])
        default: {
            console.warn(`affectedAttributesInConsequence(..) doesn't handle instances of the concept "${consequence.concept}" - returning []`)
            return []
        }
    }
}
module.exports.affectedAttributesInConsequence = affectedAttributesInConsequence


/**
 * Determines an array of unique attributes that are affected by the given business rules.
 */
const attributesAffectedBy = (businessRules) =>
    [ ...new Set(
            businessRules
                .map((businessRule) => businessRule.settings["consequence"])
                .flatMap(affectedAttributesInConsequence)
        )
    ]
module.exports.attributesAffectedBy = attributesAffectedBy

