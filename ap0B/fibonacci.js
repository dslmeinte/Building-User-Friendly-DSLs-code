/**
 * Inefficient calculation of Fibonacci numbers using recursion into a function that's defined with a `const` declaration.
 * This proves that we don't need to define functions using the `function` keyword
 *      - not even if they're recursive, and have to run under Node.js.
 */
const fibonacci = (n) => n <= 1 ? n : fibonacci(n - 2) + fibonacci(n - 1)
module.exports.fibonacci = fibonacci

