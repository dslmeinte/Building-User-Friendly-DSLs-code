// Verbatim-copy of function in './ast.js' since it's undesirable to export that from there:
const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)

// AST to test with:
const rental = require("./listing3.2")


// Exercise 1 of § 3.2:

const isAstObject = (value) => isObject(value) && ("concept" in value && typeof value.concept === "string") && ("settings" in value && isObject(value.settings))
//                                                                    ^^^^ check that concept is a string                           ^^^^ check that settings is an object

console.log(isAstObject({ concept: 1, settings: {} }))      // false
console.log(isAstObject({ concept: "Foo", settings: [] }))  // false
console.log(isAstObject(rental))                            // true (check that adapted isAstObject is not too strict)


console.log()


// Exercise 2 of § 3.2:

const isAstReference = (value) => isObject(value) && ("ref" in value && isAstObject(value.ref))
//                                                                   ^^^^ check that referenced thing is an AST object

const attributeRefSetting = rental.settings["attributes"][3].settings["initial value"].settings["attribute"]

console.log(isAstReference(attributeRefSetting))            // true
console.log(isAstReference(rental.settings["attributes"]))  // false, because that's a containment

