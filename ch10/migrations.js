const { readFile, writeFileSync } = require("fs")
const { join } = require("path")
const { deserialize, serialize, isAstObject } = require("./ast")
const { dslVersion, setDslVersion } = require("./backend/metaData")

const options = { encoding: "utf8" }
const dataPath = "./backend/data"


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
        }
    }
    if (Array.isArray(value)) {
        value.forEach(modifyDataAttribute)
    }
}
module.exports.modifyDataAttribute = modifyDataAttribute

// Exercise 10.5:
const migrateDataAttribute = (value) => {
    if (isAstObject(value)) {
        const copiedAstObject = ({
            id: value.id,
            concept: value.concept === "Data Attribute" ? "Attribute" : value.concept,
            settings: {}
        })
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

readFile(join(__dirname, dataPath, "contents.json"), options, (_, data) => {
    const serializedAst = JSON.parse(data.toString())
    const deserializedAst = deserialize(serializedAst)

    writeFileSync(
        join(__dirname, dataPath, `contents.backup-${currentDslVersion}.json`),
        data,
        options
    )

    // before Exercise 10.5:
    modifyDataAttribute(deserializedAst)
    const migratedAst = deserializedAst

    // after/with Exercise 10.5:
    // const migratedAst = migrateDataAttribute(deserializedAst)

    writeFileSync(
        join(__dirname, dataPath, "contents.json"),
        JSON.stringify(serialize(migratedAst), null, 2),
        options
    )
    setDslVersion("v2")

    console.log(`migrated from DSL version '${currentDslVersion}' to 'v2'`)
})

