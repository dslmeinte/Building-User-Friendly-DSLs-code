/**
 * @returns {string} The given string in camel-case.
 */
const camelCase = (str) => str
    .toLowerCase()
    .replace(/\s+([a-z])/g, (_, ch) => ch.toUpperCase())
    .replace(" ", "")
module.exports.camelCase = camelCase

/**
 * @returns {string} The given string with the first character converted to upper case (if possible).
 */
const withFirstUpper = (str) => str.charAt(0).toUpperCase() + str.substring(1)
module.exports.withFirstUpper = withFirstUpper

// The following is part of the reference solution for item 3 of exercise 8.6 in § 8.4.3:
const flattenTruthies = (nestedStrings) => nestedStrings.flat(Infinity).filter((x) => !!x)

// The following is part of a reference solution for the last part of Exercise 8.4 (of section § 8.4.3):
/**
 * @returns {function(*=): *} A function that maps over a single string using mapString or an array of strings using mapStrings.
 * If an array is given, that array is completely (i.e.: recursively) flattened first, before the mapStrings function is applied.
 */
const mapNestedString = (mapString, mapStrings) => (nestedString) =>
    Array.isArray(nestedString)
        ? mapStrings(flattenTruthies(nestedString))
        : mapString(nestedString)


const withNewlineEnsured = (str) => str + (str.endsWith("\n") ? "" : "\n")
/**
 * @returns {string} The given nested string joined as one string, taking care of proper newline endings.
 */
const asString = (nestedString) => Array.isArray(nestedString)
    ? flattenTruthies(nestedString)
        .map(withNewlineEnsured)
        .join("")
    : withNewlineEnsured(nestedString)
// For the last part of Exercise 8.4 (of section § 8.4.3):
// const asString = mapNestedString(withNewlineEnsured, (strings) => strings.map(withNewlineEnsured).join(""))
module.exports.asString = asString

/**
 * @returns {function} A function to indent a nested string.
 * The function always returns strings.
 */
const indent = (indentLevel) => {
    const indentationPrefix = "    ".repeat(indentLevel)
    const indentLine = (str) => indentationPrefix + str
    // const indentLine = (str) => str.split("\n").map((line) => (line.length > 0 ? indentationPrefix : "") + line).join("\n")
    // For the last part of Exercise 8.4 (of section § 8.4.3):
    // return mapNestedString(indentLine, (strings) => strings.map(indentLine))
    // Alternatively, using another nested function:
    // const flatten = mapNestedString((string) => [string], string => string)
    // return (nestedString) => flatten(nestedString).map(indentLine)
    return (nestedString) => Array.isArray(nestedString)
        ? flattenTruthies(nestedString).map(indentLine)
        : indentLine(nestedString)
}
module.exports.indent = indent

