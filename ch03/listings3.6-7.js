// Listing 3.6:

const isAstReferenceObject = (value) => isObject(value) && ("ref" in value)


// Listing 3.7:

const isAstReference = (value) => isAstReferenceObject(value) && isAstObject(value.ref)

// Export statement to be able to import this function in 'snippets-section3.2.js':
module.exports = isAstReference

