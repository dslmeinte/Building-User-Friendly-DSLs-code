/*
 * The following snippets of code correspond to the snippets in the running text of section 3.2 of chapter 3.
 * Except for the first one, all these meant to be input on the Node.js REPL.
 * The expected result of each statement line is shown directly below that as a comment line.
 */

const rental = require("./listing3.2")
// undefined

// § 3.2. Interacting with ASTs.

rental
// {
//   concept: 'Record Type',
//   settings: {
//     name: 'Rental',
//     attributes: [ [Object], [Object], [Object], [Object] ]
//   }
// }

// § 3.2.1. Accessing concept labels, and settings' values.

rental.concept
// 'Record Type'

rental.settings["name"]
// 'Rental'

rental.settings["attributes"][3]
// {
//   concept: 'Data Attribute',
//   settings: {
//     name: 'rental price after discount',
//     type: 'amount',
//     'initial value': { concept: 'Attribute Reference', settings: [Object] }
//   }
// }

const attributeRefSetting = rental.settings["attributes"][3].settings["initial value"].settings["attribute"]
// undefined

attributeRefSetting.ref
// {
//   concept: 'Data Attribute',
//   settings: {
//     name: 'rental price before discount',
//     type: 'amount',
//     'initial value': { concept: 'Number Literal', settings: [Object] }
//   }
// }

attributeRefSetting.ref === rental.settings["attributes"][1]
// true

rental.settings["attributes"][2].settings["initial value"].settings["value"] = 10
// 10
rental.settings["attributes"][2].settings["initial value"]
// { concept: 'Number Literal', settings: { value: 10 } }


// § 3.2.2. Recognizing AST objects and references.

typeof rental
// 'object`
typeof rental.settings["name"]
// 'string'

typeof rental.settings["attributes"]
// 'object`

Array.isArray(rental.settings["attributes"])
// true

Array.isArray('foo')
// false
Array.isArray(42)
// false
Array.isArray({})
// false

typeof rental
// 'object'
typeof {}
// 'object'

typeof undefined
// 'undefined'
typeof null
// 'object`

const isObject = require("./listing3.3")

isObject(undefined)
// false
isObject('foo')
// false
isObject(42)
// false
isObject([ 1, 2, 3 ])
// false
isObject({})
// true

"concept" in rental
// true
"settings" in rental
// true
"concept" in attributeRefSetting
// false
"settings" in attributeRefSetting
// false

const isAstObject = require("./listing3.4")

isAstObject(rental)
// true
isAstObject(rental.settings["attributes"])
// false
isAstObject(rental.settings["attributes"][0])
// true
isAstObject(attributeRefSetting)
// false

const isAstReference = require("./listing3.5")

isAstReference(attributeRefSetting)
// true
isAstReference(rental)
// false

