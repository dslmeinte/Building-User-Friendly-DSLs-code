const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)
const isAstObject = (value) => isObject(value) && ("concept" in value) && ("settings" in value)
const isAstReference = (value) => isObject(value) && ("ref" in value)


function serialize(value) {
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
    if (isAstReference(value)) {
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


const isSerializedAstReference = (value) => isObject(value) && ("refId" in value)

function deserialize(serializedAst) {
    const id2AstObject = {}
    const referencesToResolve = []

    function deserializeInternal(value) {
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


const { observable } = require("mobx")

function deserializeObservably(serializedAst) {
    const id2ObservableAstObject = {}
    const referencesToResolve = []

    function deserializeObservablyInternal(value) {
        if (isAstObject(value)) {
            const observableAstObject = observable({
                id: value.id,
                concept: value.concept,
                settings: {}
            })
            for (const propertyName in value.settings) {
                observableAstObject.settings[propertyName] = deserializeObservablyInternal(value.settings[propertyName])
            }
            id2ObservableAstObject[value.id] = observableAstObject
            return observableAstObject
        }
        if (isSerializedAstReference(value)) {
            const refObjectToFix = observable({})
            referencesToResolve.push([ value.refId, refObjectToFix ])
            return refObjectToFix
        }
        if (Array.isArray(value)) {
            return value.map(deserializeObservablyInternal)
        }
        return value
    }

    const deserializedAst = deserializeObservablyInternal(serializedAst)

    referencesToResolve.forEach(([ refId, refObjectToFix ]) => {
        refObjectToFix.ref = id2ObservableAstObject[refId]
    })

    return deserializedAst
}


module.exports = {
    "isAstObject": isAstObject,
    "isAstReference": isAstReference,
    "serialize": serialize,
    "deserialize": deserialize,
    "deserializeObservably": deserializeObservably
}

