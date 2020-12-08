const { readFile, writeFileSync } = require("fs")
const { join } = require("path")
const { deserialize } = require("../ast")

const options = { encoding: "utf8" }

const astPath = join(__dirname, "../backend/data/contents.json")
const indexJsxPath = join(__dirname, "../runtime/index.jsx")

const { generatedIndexJsx } = require("./indexJsx-template")

readFile(astPath, options, (_, data) => {
    const serializedAst = JSON.parse(data)
    const deserializedAst = deserialize(serializedAst)
    writeFileSync(indexJsxPath, generatedIndexJsx(deserializedAst), options)
})

