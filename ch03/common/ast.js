// Listing 3.6:

const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)

const isAstObject = (value) => isObject(value) && ("concept" in value) && ("settings" in value)
module.exports.isAstObject = isAstObject


const isAstReferenceObject = (value) => isObject(value) && ("ref" in value)

const isAstReference = (value) => isAstReferenceObject(value) && isAstObject(value.ref)
module.exports.isAstReference = isAstReference

