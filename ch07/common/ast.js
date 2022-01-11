const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)

const isAstObject = (value) => isObject(value) && ("concept" in value) && ("settings" in value) && ("id" in value)
module.exports.isAstObject = isAstObject


const isAstReferenceObject = (value) => isObject(value) && ("ref" in value)

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
            refId: isAstObject(value.ref) ? value.ref.id : undefined
        })
    }
    if (Array.isArray(value)) {
        return value.map(serialize)
    }
    return value
}
module.exports.serialize = serialize


const isSerializedAstReference = (value) => isObject(value) && ("refId" in value)

const deserialize = (serializedAst) => {
    const id2AstObject = {}
    const referencesToResolve = []

    const deserializeInternal = (value) => {
        if (isAstObject(value)) {
            const astObject = {
                id: value.id,
                concept: value.concept,
                settings: {}
            }
            for (const propertyName in value.settings) {
                astObject.settings[propertyName] = deserializeInternal(value.settings[propertyName])
            }
            id2AstObject[value.id] = astObject
            return astObject
        }
        if (isSerializedAstReference(value)) {
            const refObjectToFix = {}
            referencesToResolve.push([ value.refId, refObjectToFix ])
            return refObjectToFix
        }
        if (Array.isArray(value)) {
            return value.map(deserializeInternal)
        }
        return value
    }

    const deserializedAst = deserializeInternal(serializedAst)

    /* for producing debugging info after Listing 12:
    console.log("id2Astobject = ")
    require("../ch03/print-pretty")(id2AstObject)
    console.log()
    console.log("referencesToResolve = ")
    require("../ch03/print-pretty")(referencesToResolve)
    console.log()
    console.log()
     */

    referencesToResolve.forEach(([ refId, refObjectToFix ]) => {
        refObjectToFix.ref = id2AstObject[refId]
    })

    return deserializedAst
}
module.exports.deserialize = deserialize


const { observable } = require("mobx")

const deserializeObservably = (serializedAst) => {
    const id2AstObject = {}
    const referencesToResolve = []

    const deserializeInternal = (value) => {
        if (isAstObject(value)) {
            const astObject = observable({
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
            const refObjectToFix = observable({})
            referencesToResolve.push([ value.refId, refObjectToFix ])
            return refObjectToFix
        }
        if (Array.isArray(value)) {
            return observable(value.map(deserializeInternal))
        }
        return value
    }

    const deserializedAst = deserializeInternal(serializedAst)

    referencesToResolve.forEach(([ refId, refObjectToFix ]) => {
        refObjectToFix.ref = id2AstObject[refId]
    })

    return deserializedAst
}
module.exports.deserializeObservably = deserializeObservably


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

const astReferenceTo = (targetAstObject) => ({
    ref: targetAstObject
})
module.exports.astReferenceTo = astReferenceTo

