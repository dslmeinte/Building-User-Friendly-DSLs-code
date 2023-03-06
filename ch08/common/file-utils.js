const { readFileSync, writeFileSync } = require("fs")

const writeString = (path, data) => {
    writeFileSync(path, data)
}
module.exports.writeString = writeString


const writeJson = (path, data) => {
    writeString(path, JSON.stringify(data, null, 2))
}
module.exports.writeJson = writeJson


const readJson = (path) =>
    JSON.parse(readFileSync(path, { encoding: "utf8" }).toString())
module.exports.readJson = readJson

