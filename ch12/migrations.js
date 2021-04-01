const { join } = require("path")
const { deserialize, serialize, isAstObject } = require("./ast")
const { readJson, writeJson } = require("./file-utils")
const { dslVersion, setDslVersion } = require("./backend/metaData")

const modifyDataAttribute = (value) => {
    if (isAstObject(value)) {
        const { settings } = value
        for (const propertyName in settings) {
            modifyDataAttribute(settings[propertyName])
        }
        if (value.concept === "Data Attribute") {
            value.concept = "Attribute"
            settings["value"] = settings["initial value"]
            delete settings["initial value"]
            settings["value kind"] = "initially"
        }
    }
    if (Array.isArray(value)) {
        value.forEach(modifyDataAttribute)
    }
}
module.exports.modifyDataAttribute = modifyDataAttribute

const migrateDataAttribute = (value) => {
    if (isAstObject(value)) {
        const copiedAstObject = ({
            id: value.id,
            concept: value.concept === "Data Attribute" ? "Attribute" : value.concept,
            settings: {}
        })
        if (value.concept === "Data Attribute") {
            copiedAstObject.settings["value kind"] = "initially"
        }
        for (const propertyName in value.settings) {
            const migratedPropertyName = propertyName === "initial value" && value.concept === "Data Attribute" ? "value" : propertyName
            copiedAstObject.settings[migratedPropertyName] = migrateDataAttribute(value.settings[propertyName])
        }
        return copiedAstObject
    }
    if (Array.isArray(value)) {
        return value.map(migrateDataAttribute)
    }
    return value
}
module.exports.migrateDataAttribute = migrateDataAttribute



const currentDslVersion = dslVersion()
if (currentDslVersion === "v2") {
    console.warn("already migrated to DSL version 'v2': running it again nevertheless")
} else if (currentDslVersion !== "v1") {
    throw Error(`can only migrate from DSL version 'v1' to 'v2'`)
}

const dataPath = "./backend/data"
const contentsPath = join(__dirname, dataPath, "contents.json")
const serializedAst = readJson(contentsPath)
const deserializedAst = deserialize(serializedAst)

writeJson(join(__dirname, dataPath, `contents.backup-${currentDslVersion}.json`), serializedAst)

// before Exercise 10.5:
modifyDataAttribute(deserializedAst)
const migratedAst = deserializedAst

// after/with Exercise 10.5:
// const migratedAst = migrateDataAttribute(deserializedAst)

writeJson(contentsPath, serialize(migratedAst))
setDslVersion("v2")

console.log(`migrated from DSL version '${currentDslVersion}' to 'v2'`)

