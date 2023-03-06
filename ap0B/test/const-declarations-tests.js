const { equal, throws /*, other assertion functions to import */ } = require("chai").assert

describe("`const` declarations" , (_) => {

    it("error thrown on assigning to a `const`-declared variable twice", (done) => {
        const foo = {}

        throws(() => {
            foo = { bar: 1 }    // <-- should be flagged by IDE!
        }, TypeError)

        done()
    })

    it("error not thrown on assigning a key-value-pair to a `const`-declared variable", (done) => {
        const foo = {}
        foo.bar = 1             // <-- should not be flagged by IDE!
        equal(foo.bar, 1)
        done()
    })

})

