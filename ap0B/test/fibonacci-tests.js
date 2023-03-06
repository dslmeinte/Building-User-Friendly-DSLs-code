const { equal } = require("chai").assert

const { fibonacci } = require("../fibonacci")

describe("recursive functions defined as a `const` declaration", (_) => {

    it("Fibonacci works", (done) => {
        equal(fibonacci(0), 0)
        equal(fibonacci(1), 1)
        equal(fibonacci(2), 1)
        equal(fibonacci(3), 2)
        equal(fibonacci(4), 3)
        equal(fibonacci(5), 5)
        equal(fibonacci(6), 8)
        equal(fibonacci(7), 13)
        equal(fibonacci(8), 21)
        equal(fibonacci(9), 34)
        equal(fibonacci(10), 55)
        done()
    })

})

