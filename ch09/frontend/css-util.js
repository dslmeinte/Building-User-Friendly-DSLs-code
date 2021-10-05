/**
 * Filters the string-typed arguments out, and joins those separated with a space.
 * This is convenient for conditional class names, as follows:
 *
 *  asClassNameArgument("foo", false && "none", true && "bar") === "foo bar"
 */
const asClassNameArgument = (...classNames) => classNames.filter((className) => typeof className === "string").join(" ")
module.exports.asClassNameArgument = asClassNameArgument

