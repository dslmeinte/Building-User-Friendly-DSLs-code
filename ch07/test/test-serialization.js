/*
 * NOT intended to go in the book's text.
 */

const { deepEqual, isTrue } = require("chai").assert


const { deserialize, serialize } = require("../common/ast")

// non-exported functions copied from ../common/ast.js:
const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)
const isAstReferenceObject = (value) => isObject(value) && ("ref" in value)
const isSerializedAstReference = (value) => isObject(value) && ("refId" in value)


describe("(-de)serialization can deal with target-less references", () => {

    const refObj = { ref: undefined }

    it("serialization recognizes target-less reference objects", () => {
        isTrue(isAstReferenceObject(refObj))
    })

    it("serialization should (de-)serialize a target-less reference correctly", () => {
        const serializedRefObject = serialize(refObj)
        deepEqual(serializedRefObject, { refId: undefined })
        isTrue(isSerializedAstReference(serializedRefObject))
        const deserializedRefObject = deserialize(serializedRefObject)
        deepEqual(deserializedRefObject, { ref: undefined })
        isTrue(isAstReferenceObject(deserializedRefObject))
    })

})

