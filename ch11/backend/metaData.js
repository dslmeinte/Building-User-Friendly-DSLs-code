// for Exercise 10.4:

const { readFileSync } = require("fs")
const { join } = require("path")

const { writeJson } = require("../file-utils")


const metaDataPath = join(__dirname, "data/metaData.json")

const metaData = () =>  JSON.parse(readFileSync(metaDataPath, { encoding: "utf8" }).toString())


const dslVersion = () => metaData()["DSL-version"]
module.exports.dslVersion = dslVersion


const setDslVersion = (version) => {
    const _metaData = metaData()
    _metaData["DSL-version"] = version
    writeJson(metaDataPath, _metaData)
}
module.exports.setDslVersion = setDslVersion

