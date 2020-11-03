/**
 * @returns {string} - the given string in camel-case.
 */
const camelCase = (str) => str
    .toLowerCase()
    .replace(/ ([a-z])/g, (_, ch) => ch.toUpperCase())
    .replace(" ", "")

/**
 * @returns {string} - the given string with the first character converted to upper case (if possible).
 */
const withFirstUpper = (str) => str.charAt(0).toUpperCase() + str.substring(1)


/**
 * @returns {function(*=): *} - a function that maps over a single string using mapString or an array of strings using mapStrings.
 * If an array is given, that array is completely (i.e.: recursively) flattened first, before the mapStrings function is applied.
 */
const mapNestedString = (mapString, mapStrings) => (nestedString) =>
    Array.isArray(nestedString)
        ? mapStrings(nestedString.flat(Infinity))   // flatten to string[] first
        : mapString(nestedString)


const withNewlineEnsured = (str) => str + (str.endsWith("\n") ? "" : "\n")
/**
 * @returns {string} - the given nested string joined as one string, taking care of proper newline endings.
 */
// const asString = mapNestedString(withNewlineEnsured, (strings) => strings.map(withNewlineEnsured).join(""))
const asString = (nestedString) => Array.isArray(nestedString)
    ? nestedString.flat(Infinity)
        .map(withNewlineEnsured)
        .join("")
    : withNewlineEnsured(nestedString)


/**
 * @returns {function} - a function to indent a nested string.
 * The function always returns strings.
 */
const indent = (indentLevel) => {
    const indentationPrefix = "    ".repeat(indentLevel)
    const indentLine = (str) => indentationPrefix + str
    // const indentLine = (str) => str.split("\n").map((line) => (line.length > 0 ? indentationPrefix : "") + line).join("\n")
    // const flatten = mapNestedString((string) => [string], string => string)
    // return (nestedString) => flatten(nestedString).map(indentLine)
    // return mapNestedString(indentLine, (strings) => strings.map(indentLine))
    return (nestedString) => Array.isArray(nestedString)
        ? nestedString.flat(Infinity).map(indentLine)
        : indentLine(nestedString)
}


module.exports = {
    "asString": asString,
    "camelCase": camelCase,
    "indent": indent,
    "withFirstUpper": withFirstUpper
}

