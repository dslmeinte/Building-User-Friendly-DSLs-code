const { isAstObject, isAstReference } = require("./common/ast")

const rental = require("./rental-AST")


// Exercise 3.2: see file section3.3.js


// (Exercise 3.3: no example answer provided)


// Exercise 3.4:

const leaves = (value) => {
    if (isAstObject(value)) {
        const subLeaves = Object.values(value.settings).flatMap(leaves)
        return subLeaves.length === 0 ? [ value ] : subLeaves
    }
    if (isAstReference(value)) {
        return []
    }
    if (Array.isArray(value)) {
        return value.flatMap(leaves)
    }
    return []
}

console.log(`leaves(“Rental“ AST):`)
console.dir(leaves(rental))
console.log()


// Exercise 3.5:

const { sum } = require("./section3.3")

const weight = (value) => {
    if (isAstObject(value)) {
        return 1 + sum(Object.values(value.settings).map(weight))
    }
    if (isAstReference(value)) {
        return 1
    }
    if (Array.isArray(value)) {
        return sum(value.map(weight))
    }
    return 1
}

console.log(`weight(“Rental“ AST)=${weight(rental)}`)
console.log()


// Exercise 3.6:

const findByName = (name, value) => {
    if (isAstObject(value)) {
        if (value.settings["name"] === name) {
            return value
        }
        for (const propertyName in value.settings) {
            const recurse = findByName(name, value.settings[propertyName])
            if (recurse !== undefined) {
                return recurse
            }
        }
        return undefined
    }
    if (isAstReference(value)) {
        return undefined
    }
    if (Array.isArray(value)) {
        for (const item of value) {
            const recurse = findByName(name, item)
            if (recurse !== undefined) {
                return recurse
            }
        }
        return undefined
    }
    return undefined
}

console.dir(findByName("Rental", rental))
console.dir(findByName("rental price before discount", rental))
console.dir(findByName("discount", rental))
console.dir(findByName("rental price after discount", rental))
console.dir(findByName("foo", rental))

