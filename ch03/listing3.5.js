// Listing 3.5:

const isAstReference = (value) => isObject(value) && ("ref" in value)

// Export statement to be able to import this function in 'snippets-section3.2.js':
module.exports = isAstReference

