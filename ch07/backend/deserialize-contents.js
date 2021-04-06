const { readFile } = require("fs")
const { join } = require("path")
const { deserialize } = require("../ast")

const options = { encoding: "utf8" }

const contentsPath = join(__dirname, "data/contents.json")

readFile(contentsPath, options, (_, data) => {
    const serializedAst = JSON.parse(data)
    const deserializedAst = deserialize(serializedAst)
    require("../../ch03/print-pretty")(deserializedAst)
})

