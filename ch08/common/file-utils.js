const { readFileSync, writeFileSync } = require("fs")

const options = { encoding: "utf8" }


const writeString = (path, data) => {
    writeFileSync(path, data, options)
}
module.exports.writeString = writeString


const writeJson = (path, data) => {
    writeString(path, JSON.stringify(data, null, 2))
}
module.exports.writeJson = writeJson


const readJson = (path) => JSON.parse(readFileSync(path, options).toString())
module.exports.readJson = readJson

