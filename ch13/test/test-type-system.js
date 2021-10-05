const { isTrue } = require("chai").assert

const { newAstObject } = require("../common/ast")
const { attributeReferenceTo, binaryOperation, number, parentheses } = require("../language/factories")
const { areEqual, builtInTypes, typeOf, untype } = require("../language/type-system")

const rental = require("../init/example-AST")
const { attributes: testAttributes } = rental.settings

const typeEqual = (actual, expected) => isTrue(areEqual(actual, expected))


describe("typeOf edge case", (_) => {

    it("type of something that's not an AST object should be undefined", () => {
        typeEqual(typeOf(undefined, []), untype)
        typeEqual(typeOf(null, []), untype)
        typeEqual(typeOf([], []), untype)
        typeEqual(typeOf({}, []), untype)
        typeEqual(typeOf({ concept: "Some Type" }, []), untype)  // No `settings` sub object.
    })

})


describe("typeOf numbers", (_) => {

    it("is undefined without more information", () => {
        typeEqual(typeOf(number(1), []), untype)
    })

    it("is defined through a directly-containing attribute", () => {
        const amountType = builtInTypes["amount"]
        const attribute = newAstObject("Attribute", { type: "amount", value: number(2) })
        typeEqual(typeOf(attribute.settings["value"], [attribute]), amountType)
    })

})


describe("typeOf binary operations", (_) => {

    const operation = binaryOperation("?operator?", attributeReferenceTo(testAttributes[2]), attributeReferenceTo(testAttributes[1]))   // bogus value for operator - to be overwritten by unit tests

    it("minus", () => {
        operation.settings["operator"] = "-"
        typeEqual(typeOf(operation, []), builtInTypes["percentage"])
    })

    it("of", () => {
        operation.settings["operator"] = "of"
        typeEqual(typeOf(operation, []), builtInTypes["amount"])
    })

})


describe("typeOf parentheses", (_) => {

    it("parentheses", () => {
        const parenthesized = parentheses(attributeReferenceTo(testAttributes[0]))
        typeEqual(typeOf(parenthesized, [ testAttributes[1], rental ]), builtInTypes["date range"])
        /*
         * Expression is "rigged" to be contained by the 2nd attribute, even though it isn't.
         * Type-computation isn't affected by that.
         */
    })

})


describe("typeOf typable non-expressions (and children)", (_) => {

    it("attributes", () => {
        typeEqual(typeOf(testAttributes[0], [rental]), builtInTypes["date range"])
        typeEqual(typeOf(testAttributes[1], [rental]), builtInTypes["amount"])
        typeEqual(typeOf(testAttributes[2], [rental]), builtInTypes["percentage"])
        typeEqual(typeOf(testAttributes[3], [rental]), builtInTypes["amount"])
    })

    it("is able to type-compute attributes' values", () => {
        const valueOf = (attribute) => attribute.settings["value"]
        // (attribute 0 has no value)
        typeEqual(typeOf(valueOf(testAttributes[1]), [ testAttributes[1], rental ]), builtInTypes["amount"])
        typeEqual(typeOf(valueOf(testAttributes[2]), [ testAttributes[2], rental ]), builtInTypes["percentage"])
        typeEqual(typeOf(valueOf(testAttributes[3]), [ testAttributes[3], rental ]), builtInTypes["amount"])
    })

    it("record types", () => {
        typeEqual(typeOf(rental, []), rental)
    })

})

