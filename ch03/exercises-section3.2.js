// Verbatim-copy of function in './ast.js' since it's undesirable to export that from there:
const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)

// AST to test with:
const rental = require("./rental-AST")


// Exercise 3.1:

const isAstObject = (value) => isObject(value) && ("concept" in value && typeof value.concept === "string") && ("settings" in value && isObject(value.settings))
//                                                                    ^^^^ check that concept is a string                           ^^^^ check that settings is an object

console.log(isAstObject({ concept: 1, settings: {} }))      // false
console.log(isAstObject({ concept: "Foo", settings: [] }))  // false
console.log(isAstObject(rental))                            // true (check that adapted isAstObject is not too strict)

