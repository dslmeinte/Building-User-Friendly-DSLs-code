const { join } = require("path")

const { readJson, writeJson } = require("../common/file-utils")


const contentsPath = join(__dirname, "data", "contents.json")

const readContents = () => readJson(contentsPath)
module.exports.readContents = readContents

const writeContents = (contents) => writeJson(contentsPath, contents)
module.exports.writeContents = writeContents

