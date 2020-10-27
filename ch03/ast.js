// Listing 3.6:

const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)
const isAstObject = (value) => isObject(value) && ("concept" in value) && ("settings" in value)
const isAstReference = (value) => isObject(value) && ("ref" in value)

module.exports = { "isAstObject": isAstObject, "isAstReference": isAstReference }

