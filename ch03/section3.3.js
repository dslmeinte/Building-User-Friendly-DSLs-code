const { isAstObject, isAstReference } = require("./common/ast")


const numberOfLeaves = (value) => {

    // Exercise 3.3:
    console.log(`numberOfLeaves called with following value:`)
    console.dir(value)
    console.log()   // newline, for separation

    if (isAstObject(value)) {
        const sub = sum(Object.values(value.settings).map(numberOfLeaves))
        return sub === 0 ? 1 : sub
    }
    if (isAstReference(value)) {
        return 0
    }
    if (Array.isArray(value)) {
        return sum(value.map(numberOfLeaves))
    }
    return 0
}


const sum = (numbers) =>
    numbers.reduce((currentSum, currentNumber) => currentSum + currentNumber, 0)
module.exports.sum = sum    // We'll reuse this function in exercises-section3.3.js.


const rental = require("./rental-AST")
console.log(`numberOfLeaves(“Rental“ AST)=${numberOfLeaves(rental)}`)
console.log()

