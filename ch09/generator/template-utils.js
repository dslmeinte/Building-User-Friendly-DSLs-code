/**
 * @returns {string} The given string in camel-case.
 */
const camelCase = (str) => typeof str === "string"
    ? str
        .toLowerCase()
        .replace(/\s+([a-z])/g, (_, ch) => ch.toUpperCase())
        .replace(" ", "")
    : "__generationProblemDueToNonStringArgumentToCamelCase"
module.exports.camelCase = camelCase

/**
 * @returns {string} The given string with the first character converted to upper case (if possible).
 */
// was: const withFirstUpper = (str) => str.charAt(0).toUpperCase() + str.substring(1)
const withFirstUpper = (str) => typeof str === "string"
    ? str.charAt(0).toUpperCase() + str.substring(1)
    : "GenerationProblemDueToNonStringArgumentToWithFirstUpper"
module.exports.withFirstUpper = withFirstUpper

const flattenTruthies = (nestedStrings) => nestedStrings.flat(Infinity).filter((x) => !!x)

const withNewlineEnsured = (str) => str + (str.endsWith("\n") ? "" : "\n")
/**
 * @returns {string} The given nested string joined as one string, taking care of proper newline endings.
 */
const asString = (nestedString) => Array.isArray(nestedString)
    ? flattenTruthies(nestedString)
        .map(withNewlineEnsured)
        .join("")
    : withNewlineEnsured(nestedString)
module.exports.asString = asString

/**
 * @returns {function} A function to indent a nested string.
 * The function always returns strings.
 */
const indent = (indentLevel) => {
    const indentationPrefix = "    ".repeat(indentLevel)
    const indentLine = (str) => indentationPrefix + str
    return (nestedString) => Array.isArray(nestedString)
        ? flattenTruthies(nestedString).map(indentLine)
        : indentLine(nestedString)
}
module.exports.indent = indent

