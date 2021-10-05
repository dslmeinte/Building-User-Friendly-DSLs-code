const { isAstObject, isAstReference } = require("./common/ast")

const sum = (numbers) => numbers.reduce((currentSum, currentNumber) => currentSum + currentNumber, 0)

const numberOfLeaves = (value) => {
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

const rental = require("./listing3.2")
console.log(numberOfLeaves(rental))

