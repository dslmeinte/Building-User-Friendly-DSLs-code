/*
 * NOT intended to go in the book's text.
 */

const { deepEqual, equal, isTrue } = require("chai").assert
const { cycleWith } = require("./attribute-references-utils")
const { generate: newId } = require("shortid")

describe("attribute-references-utils.js:", (_) => {

    const attributeRefTo = (refAttribute) => ({
        id: newId(),
        concept: "Attribute Reference",
        settings: {
            "attribute": {
                ref: refAttribute
            }
        }
    })

    const attribute = (name) => ({
        id: newId(),
        concept: "Data Attribute",
        settings: {
            "name": name,
            "type": "amount"
        }
    })

    const attributes = [ 1, 2, 3, 4 ].map((n) => attribute("attribute " + n))
    attributes[4 - 1].settings["initial value"] = attributeRefTo(attributes[3 - 1])
    attributes[3 - 1].settings["initial value"] = attributeRefTo(attributes[2 - 1])
    attributes[2 - 1].settings["initial value"] = attributeRefTo(attributes[1 - 1])
    attributes[1 - 1].settings["initial value"] = attributeRefTo(attributes[3 - 1])


    it("cycleWith should (only) detect attributes in cycles", (done) => {
        ;[ 1, 2, 3 ].forEach((n) => isTrue(cycleWith(attributes[n - 1]).length > 0), "in cycle")
        equal(cycleWith(attributes[4 - 1]).length, 0, "not in cycle")
        done()
    })

})


/**
 * re-implementation of dependencyOrderOf where each attribute object is of the form { id: index + 1, ref: id | null }.
 */
const dependencyOrderOfFakeAttributes = (attributes) => {
    const ordered = []

    for (const attribute of attributes) {
        if (ordered.indexOf(attribute) > -1) {    // (We've encountered this attribute before.)
            continue
        }

        // Follow the chain in arrow-order:
        const chain = []
        let current = attribute
        // Stop when the chain stops, or when we find an attribute that we encountered before:
        while (current && ordered.indexOf(current) === -1) {
            // Check whether we're in a cycle:
            if (chain.indexOf(current) > -1) {
                return false
            }
            chain.push(current)
            current = current.ref ? attributes[current.ref - 1] : false
        }
        // Append the chain in reverse order to the dependency order:
        ordered.push(...chain.reverse())

    }

    return ordered
}


describe("topological sort", (_) => {

    const refsAsAttributes = (refs) => refs.map((ref, index) => ({ id: index + 1, ref }))
    const idsOf = (attributes) => attributes.map((attribute) => attribute.id)

    it("exercises", (done) => {
        deepEqual(idsOf(dependencyOrderOfFakeAttributes(refsAsAttributes([ null, null, 2, 3 ]))), [ 1, 2, 3, 4 ], "1.")
        deepEqual(idsOf(dependencyOrderOfFakeAttributes(refsAsAttributes([ 2, 3, 4, null ]))), [ 4, 3, 2, 1 ], "2.")
        deepEqual(idsOf(dependencyOrderOfFakeAttributes(refsAsAttributes([ null, 1, 1, 3 ]))), [ 1, 2, 3, 4 ], "3.")
        deepEqual(idsOf(dependencyOrderOfFakeAttributes(refsAsAttributes([ 2, null, 1, 3 ]))), [ 2, 1, 3, 4 ], "4.")
        done()
    })

})

