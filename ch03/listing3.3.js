// Listing 3.3:

const isObject = (value) => (!!value) && (typeof value === "object") && !Array.isArray(value)

// Export statement to be able to import this function in 'snippets-section3.2.js':
module.exports = isObject

