const { readFile, writeFileSync } = require("fs")
const { join } = require("path")
const { deserialize } = require("../ast")

const options = { encoding: "utf8" }

const astPath = join(__dirname, "../backend/data/contents.json")
const indexJsxPath = join(__dirname, "../runtime/index.jsx")

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

readFile(astPath, options, (_, data) => {
    const serializedAst = JSON.parse(data)
    const deserializedAst = deserialize(serializedAst)
    writeFileSync(indexJsxPath, generatedIndexJsx(deserializedAst), options)
})

