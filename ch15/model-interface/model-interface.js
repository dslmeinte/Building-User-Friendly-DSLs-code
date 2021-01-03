const { isAstObject } = require("../../ch09/ast")

const asInterface = (value) => {
    if (isAstObject(value)) {
        const reducedAstObject = {
            id: value.id,
            concept: value.concept,
            settings: {}
        }
        const { settings } = value
        const { settings: reducedSettings } = reducedAstObject
        switch (value.concept) {
            case "Record Type": {
                reducedSettings["name"] = settings["name"]
                reducedSettings["attributes"] = asInterface(settings["attributes"])
                break
            }
            case "Data Attribute": {
                reducedSettings["name"] = settings["name"]
                reducedSettings["type"] = settings["type"]
                break
            }
            // (AST objects of other concepts are not encountered anymore.)
        }
        return reducedAstObject
    }
    if (Array.isArray(value)) {
        return value.map(asInterface)
    }
}


const rental = require("../../ch09/backend/Rental-AST")
const prettyPrint = require("../../ch03/print-pretty")

prettyPrint(asInterface(rental))

