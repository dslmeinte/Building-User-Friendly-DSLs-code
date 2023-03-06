const { join } = require("path")

const { deserialize } = require("../common/ast")
const { writeString } = require("../common/file-utils")
const { readContents } = require("../backend/storage")

/*
 * The following implements some convenience on top of the book's code,
 * so we can run intermediate versions of the final template code in indexJsx-template.js
 * by specifying an extra argument when running the generator as follows:
 *
 *  node src/generator/generate.js indexJsx-01-verbatim-generation-target.js
 *
 * Note that the extra argument is the full filename of the intermediate version of indexJsx-template.js
 */
const templateCliArgument = process.argv[2]
const templateFile = "./" + (templateCliArgument ? templateCliArgument.substring(0, templateCliArgument.lastIndexOf(".js")) : "indexJsx-template")

const { generatedIndexJsx } = require(templateFile)

const indexJsxPath = join(__dirname, "..", "runtime", "index.jsx")

const serializedAst = readContents()
const deserializedAst = deserialize(serializedAst)
writeString(indexJsxPath, generatedIndexJsx(deserializedAst))

