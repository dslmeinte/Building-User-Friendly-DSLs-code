const { join } = require("path")

const { readVersionedContents } = require("../backend/storage")
const { deserialize, isAstObject } = require("../common/ast")
const { issuesFor } = require("../language/constraints")
const { writeString } = require("../common/file-utils")
const { generatedIndexJsx } = require("./indexJsx-template")


const printIssue = (issue, astObject) => {
    console.log(`[ERROR] on AST object with id='${astObject.id}', concept='${astObject.concept}'; message: "${issue}"`)
}

const printAllIssuesFor = (value, ancestors) => {
    if (isAstObject(value)) {
        issuesFor(value, ancestors).forEach((issue) => printIssue(issue, value))
        for (const propertyName in value.settings) {
            printAllIssuesFor(value.settings[propertyName], [ value, ...ancestors ])
        }
    }
    if (Array.isArray(value)) {
        value.forEach((item) => printAllIssuesFor(item, ancestors))
    }
}


const ast = deserialize(readVersionedContents().contents)

printAllIssuesFor(ast, [])

const indexJsxPath = join(__dirname, "../runtime/index.jsx")
writeString(indexJsxPath, generatedIndexJsx(ast))

