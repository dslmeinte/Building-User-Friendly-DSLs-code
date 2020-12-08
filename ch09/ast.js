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

