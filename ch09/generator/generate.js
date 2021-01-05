const { readFile, writeFileSync } = require("fs")
const { join } = require("path")
const { deserialize, isAstObject } = require("../ast")
const { issuesFor } = require("../constraints")

const options = { encoding: "utf8" }

const astPath = join(__dirname, "../backend/data/contents.json")
const indexJsxPath = join(__dirname, "../runtime/index.jsx")

const { generatedIndexJsx } = require("./indexJsx-template")

readFile(astPath, options, (_, data) => {
    const serializedAst = JSON.parse(data)
    const deserializedAst = deserialize(serializedAst)

    // Print all issues - this is the 3rd exercise of § 9.2 (in the 2nd exercise block):

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


    writeFileSync(indexJsxPath, generatedIndexJsx(deserializedAst), options)
})

