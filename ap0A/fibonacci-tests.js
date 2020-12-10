/**
 * Inefficient calculation of Fibonacci numbers using recursion into a function that's defined with a `const` declaration.
 * This proves that we don't need to define functions using the `function` keyword
 *      - not even if they're recursive, and have to run under Node.js.
 */
const fibonacci = (n) => n <= 1 ? n : fibonacci(n - 2) + fibonacci(n - 1)


const { equal, throws /*, other assertion functions to import */ } = require("chai").assert


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


describe("`const` declarations" , (_) => {

    it("error thrown on assigning to a `const`-declared variable twice", (done) => {
        const foo = {}

        throws(() => {
            foo = { bar: 1 }    // <-- flagged by IDE?
        }, TypeError)

        done()
    })

    it("error not thrown on assigning a key-value-pair to a `const`-declared variable", (done) => {
        const foo = {}
        foo.bar = 1             // <-- should not be flagged by IDE
        equal(foo.bar, 1)
        done()
    })

})

