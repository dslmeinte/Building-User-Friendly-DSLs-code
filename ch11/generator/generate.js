const { join } = require("path")
const { deserialize, isAstObject } = require("../ast")
const { issuesFor } = require("../constraints")
const { readJson, writeString } = require("../file-utils")

const astPath = join(__dirname, "../backend/data/contents.json")
const indexJsxPath = join(__dirname, "../runtime/index.jsx")

const { generatedIndexJsx } = require("./indexJsx-template")

const serializedAst = readJson(astPath)
const deserializedAst = deserialize(serializedAst)

const printIssue = (issue, astObject) => {
    console.log(`[ERROR] on AST object with id='${astObject.id}', concept='${astObject.concept}'; message: "${issue}"`)
}

const printAllIssuesFor = (value, ancestors) => {
    if (isAstObject(value)) {
        issuesFor(value, ancestors).forEach((issue) => printIssue(issue, value))
        for (const propertyName in value.settings) {
            printAllIssuesFor(value.settings[propertyName], [ ...ancestors, value ])
        }
    }
    if (Array.isArray(value)) {
        value.forEach((item) => printAllIssuesFor(item, ancestors))
    }
}

printAllIssuesFor(deserializedAst, [])

writeString(indexJsxPath, generatedIndexJsx(deserializedAst))

