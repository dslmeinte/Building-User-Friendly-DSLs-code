// for Exercise 10.4:

const { readFileSync, writeFileSync } = require("fs")
const { join } = require("path")

const options = { encoding: "utf8" }


const metaDataPath = join(__dirname, "data/metaData.json")

const metaData = () => JSON.parse(readFileSync(metaDataPath, options).toString())


const dslVersion = () => metaData()["DSL-version"]
module.exports.dslVersion = dslVersion


const setDslVersion = (version) => {
    const _metaData = metaData()
    _metaData["DSL-version"] = version
    writeFileSync(metaDataPath, JSON.stringify(_metaData, null, 2), options)
}
module.exports.setDslVersion = setDslVersion

