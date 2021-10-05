const { join } = require("path")
const { copyFileSync, existsSync } = require("fs")

const { readJson, writeJson } = require("../common/file-utils")


const dataPath = join(__dirname, "data")


const contentsPath = join(dataPath, "contents.json")

const readContents = () => existsSync(contentsPath) ? readJson(contentsPath) : {}
const writeContents = (contents) => writeJson(contentsPath, contents)
module.exports.writeContents = writeContents


const metaDataPath = join(dataPath, "metaData.json")
const dslVersionKey = "DSL-version"

const readMetaData = () => existsSync(metaDataPath) ? readJson(metaDataPath) : { [dslVersionKey]: undefined }
const writeMetaData = (metaData) => writeJson(metaDataPath, metaData)


/**
 * Reads the contents, and the DSL version, as a plain object.
 * @return {{ contents: JSON, version: string }}
 */
const readVersionedContents = () => ({
    contents: readContents(),
    version: readMetaData()[dslVersionKey]
})
module.exports.readVersionedContents = readVersionedContents


/**
 * Writes the given `contents` to storage.
 * When a string `version` is also given, the currently-stored contents (if any) are backup'd,
 * and the DSL version in the meta data is updated to `version` - otherwise, nothing happens related to DSL version.
 */
const writeVersionedContents = (contents, version) => {
    if (typeof version === "string") {
        const metaData = readMetaData()
        // make a backup of the current contents:
        if (existsSync(contentsPath)) {
            copyFileSync(contentsPath, join(dataPath, `contents.backup-${metaData[dslVersionKey]}.json`))
        }
        metaData[dslVersionKey] = version
        writeMetaData(metaData)
    }
    writeContents(contents)
}
module.exports.writeVersionedContents = writeVersionedContents

