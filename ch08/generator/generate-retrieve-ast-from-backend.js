const http = require("http")
const { join } = require("path")

const { deserialize } = require("../common/ast")
const { writeString } = require("../common/file-utils")
const { generatedIndexJsx } = require("./generator")

const indexJsxPath = join(__dirname, "../runtime/index.jsx")

http.request({
    hostname: "localhost",
    port: 8080,
    path: "/contents",
    method: "GET"
}, (response) => {
    let serializedAst = ""
    response.on("data", (chunk) => {
        serializedAst += chunk
    })
    response.on("end", () => {
        const ast = deserialize(JSON.parse(serializedAst))
        writeString(indexJsxPath, generatedIndexJsx(ast))
    })
}).end()

