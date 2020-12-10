/**
 * Inefficient calculation of Fibonacci numbers using recursion into a function that's defined with a `const` declaration.
 * This proves that we don't need to define functions using the `function` keyword
 *      - not even if they're recursive, and have to run under Node.js.
 */
const fibonacci = (n) => n <= 1 ? n : fibonacci(n - 2) + fibonacci(n - 1)


const { equal } = require("chai").assert


describe("recursive functions defined with a `const` declaration", (_) => {

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


