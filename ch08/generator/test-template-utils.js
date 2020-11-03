/*
 * NOT intended to go in the book's text.
 */

const { equal, deepEqual } = require("chai").assert
const { asString, camelCase, indent, withFirstUpper } = require("./template-utils")


describe("template-utils.js:", (_) => {

    it("withFirstUpper should work", (done) => {
        equal(withFirstUpper("foo"), "Foo")
        equal(withFirstUpper("bar"), "Bar")
        equal(withFirstUpper("123"), "123")
        done()
    })

    it("camelCase should work", (done) => {
        equal(camelCase("foo bar"), "fooBar")
        equal(camelCase("a DSL book"), "aDslBook")
        equal(camelCase("A 1 b c"), "a1BC")
        done()
    })

    it("asString should work", (done) => {
        deepEqual(asString("foo"), "foo\n")
        deepEqual(asString("foo\n"), "foo\n")
        deepEqual(asString(["foo", "bar"]), "foo\nbar\n")
        deepEqual(asString(["foo\n", "bar"]), "foo\nbar\n")
        deepEqual(asString(["foo", [[]]]), "foo\n")
        deepEqual(asString(["foo", [["bar"]]]), "foo\nbar\n")
        deepEqual(asString(["foo", ["bar\n", ["ants"]]]), "foo\nbar\nants\n")
        deepEqual(asString(["foo", ["bar\n", ["ants"], "aphids"]]), "foo\nbar\nants\naphids\n")
        done()
    })

    it("indent should work", (done) => {
        deepEqual(indent(1)("foo"), "    foo")
        deepEqual(indent(1)([ "foo", "bar" ]), [ "    foo", "    bar" ])
        deepEqual(indent(0)([ "foo", indent(1)([ "bar", indent(2)([ "ants" ])])]), [ "foo", "    bar", "            ants" ])
        done()
    })

})

