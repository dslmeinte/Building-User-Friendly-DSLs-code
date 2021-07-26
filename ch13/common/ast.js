const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)

const isAstObject = (value) => isObject(value) && ("concept" in value) && ("settings" in value) && ("id" in value)  // TODO  back-propagate
module.exports.isAstObject = isAstObject

const isAstReferenceObject = (value) => isObject(value) && ("ref" in value)
// TODO  back-propagate!

const isAstReference = (value) => isAstReferenceObject(value) && isAstObject(value.ref)
module.exports.isAstReference = isAstReference

const placeholderAstObject = "<placeholder for an AST object>"
module.exports.placeholderAstObject = placeholderAstObject

const serialize = (value) => {
    if (isAstObject(value)) {
        const serializedAstObject = {
            id: value.id,
            concept: value.concept,
            settings: {}
        }
        for (const propertyName in value.settings) {
            serializedAstObject.settings[propertyName] = serialize(value.settings[propertyName])
        }
        return serializedAstObject
    }
    if (isAstReferenceObject(value)) {
        // Instead of a reference object, return an object with a 'refId === ref.id':
        return ({
            refId: value.ref.id
        })
    }
    if (Array.isArray(value)) {
        return value.map(serialize)
    }
    return value
}
module.exports.serialize = serialize


const isSerializedAstReference = (value) => isObject(value) && ("refId" in value)

const makeDeserialize = (modify) => (serializedAst) => {
    const id2AstObject = {}
    const referencesToResolve = []

    const deserializeInternal = (value) => {
        if (isAstObject(value)) {
            const astObject = modify({
                id: value.id,
                concept: value.concept,
                settings: {}
            })
            for (const propertyName in value.settings) {
                astObject.settings[propertyName] = deserializeInternal(value.settings[propertyName])
            }
            id2AstObject[value.id] = astObject
            return astObject
        }
        if (isSerializedAstReference(value)) {
            const refObjectToFix = modify({})
            referencesToResolve.push([ value.refId, refObjectToFix ])
            return refObjectToFix
        }
        if (Array.isArray(value)) {
            return value.map(deserializeInternal)
        }
        return value
    }

    const deserializedAst = deserializeInternal(serializedAst)

    referencesToResolve.forEach(([ refId, refObjectToFix ]) => {
        refObjectToFix.ref = id2AstObject[refId]
    })

    return deserializedAst
}


module.exports.deserialize = makeDeserialize((o) => o)


const { observable } = require("mobx")

module.exports.deserializeObservably = makeDeserialize(observable)


/*
 * Factory functions.
 */

const { nanoid } = require("nanoid")
const newId = () => nanoid(10)  // 1% chance of at least 1 collision in ~17 years with 1000 IDs generated per hour

const newAstObject = (concept, settings) => ({
    id: newId(),
    concept,
    settings: settings || {}
})
module.exports.newAstObject = newAstObject

const astReferenceTo = (referredAstObject) => ({
    ref: referredAstObject
})
module.exports.astReferenceTo = astReferenceTo


/*
 * Manipulation functions.
 */

const setSingleValue = (astObject, propertyName) => {
    const { settings } = astObject
    return (newValue) => {
        if (newValue === undefined) {
            delete settings[propertyName]
        } else {
            settings[propertyName] = newValue
        }
    }
}
module.exports.setSingleValue = setSingleValue

const setInMultipleValue = (astObject, propertyName, index) => {
    const arrayValue = astObject.settings[propertyName]
    return (newValue) => {
        if (newValue === undefined) {
            arrayValue.splice(index, 1)
        } else {
            arrayValue.splice(index, 1, newValue)
        }
    }
}
module.exports.setInMultipleValue = setInMultipleValue


/*
 * Convenience/queries functions.
 */

const firstAncestorOfConcept = (concept, ancestors) => ancestors.find((ancestor) => ancestor.concept === concept)
module.exports.firstAncestorOfConcept = firstAncestorOfConcept
// TODO  show this function already in chapter 5


/**
 * Find all instances of the specified `concept` in the tree hanging off of the given `newAstObject`.
 * It also includes `newAstObject` itself if it has the specified `concept`.
 * The computation follows parent-child relations, but not reference relations.
 * @param concept A string containing the concept to search for.
 * @param astObject An AST object.
 * @return {ASTObject[]} An array -possibly empty- of AST objects of the given `concept`.
 */
const allInstancesOf = (concept, astObject) => {
    const instances = []

    const visit = (value) => {
        if (isAstObject(value)) {
            if (value.concept === concept) {
                instances.push(value)
            }
            const { settings } = value
            for (const propertyName in settings) {
                visit(settings[propertyName])
            }
        }
        if (Array.isArray(value)) {
            return value.forEach(visit)
        }
        // Don't do anything for other values including AST reference objects.
    }

    visit(astObject)

    return instances
}
module.exports.allInstancesOf = allInstancesOf
// TODO  explain this function in chapter 9, as it's generically a very valuable function, in favor of an implementation that has to know about all expression concepts

