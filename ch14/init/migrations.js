const { deserialize, isAstObject, serialize } = require("../common/ast")
const { readVersionedContents, writeVersionedContents } = require("../backend/storage")


const migrateDataAttribute = (value) => {
    if (isAstObject(value)) {
        const copiedAstObject = {
            id: value.id,
            concept: value.concept === "Data Attribute" ? "Attribute" : value.concept,
            settings: {}
        }
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


const addBusinessRulesProperty = (recordType) => {
    if (!Array.isArray(recordType.settings["business rules"])) {
        recordType.settings["business rules"] = []
    }
    return recordType
}


const doMigration = (fromVersion, toVersion, migrate) => {
    const { contents, version } = readVersionedContents()

    if (version !== fromVersion && version !== toVersion) {
        console.warn(`can only migrate from DSL version '${fromVersion}' (to '${toVersion}'), not to '${version}': skipping this migration`)
        return
    }

    if (version === toVersion) {
        console.warn(`already migrated to DSL version '${toVersion}': assuming idempotency, and running it again`)
    }

    writeVersionedContents(serialize(migrate(deserialize(contents))), toVersion)

    console.log(`migrated from DSL version '${version}' to '${toVersion}'`)
}


doMigration("v1", "v2", migrateDataAttribute)
doMigration("v2", "v3", addBusinessRulesProperty)

