const { join } = require("path")

const { deserialize, isAstObject } = require("../common/ast")
const { writeString } = require("../common/file-utils")
const { readVersionedContents } = require("../backend/storage")
const { issuesFor } = require("../language/constraints")
const { generatedIndexJsx } = require("./indexJsx-template")

const indexJsxPath = join(__dirname, "..", "runtime", "index.jsx")

const serializedAst = readVersionedContents().contents
const deserializedAst = deserialize(serializedAst)


const printIssue = (issue, astObject) => {
    console.log(`[ERROR] on AST object with id='${astObject.id}', concept='${astObject.concept}'; message: "${issue}"`)
}

const printAllIssuesFor = (astObject, ancestors) => {
    if (isAstObject(astObject)) {
        issuesFor(astObject, ancestors).forEach((issue) => printIssue(issue, astObject))
        for (const propertyName in astObject.settings) {
            printAllIssuesFor(astObject.settings[propertyName], [ astObject, ...ancestors ])
        }
    }
    if (Array.isArray(astObject)) {
        astObject.forEach((item) => printAllIssuesFor(item, ancestors))
    }
}

printAllIssuesFor(deserializedAst, [])


writeString(indexJsxPath, generatedIndexJsx(deserializedAst))

