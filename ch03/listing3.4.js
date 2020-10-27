// Listing 3.4:

const isAstObject = (value) => isObject(value) && ("concept" in value) && ("settings" in value)

// Export statement to be able to import this function in 'snippets-section3.2.js':
module.exports = isAstObject

