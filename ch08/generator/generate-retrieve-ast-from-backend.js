const { writeFileSync } = require("fs")
const http = require("http")
const { join } = require("path")

const { deserialize } = require("../ast")
const { generateIndexJsx } = require("../generator/generator")

const options = { encoding: "utf8" }

const indexJsxPath = join(__dirname, "../runtime/index.jsx")

http.request({
    hostname: "localhost",
    port: 8080,
    path: "/ast",
    method: "GET"
}, (response) => {
    let serializedAst = ""
    response.on("data", (chunk) => {
        serializedAst += chunk
    })
    response.on("end", () => {
        const ast = deserialize(JSON.parse(serializedAst))
        writeFileSync(indexJsxPath, generateIndexJsx(ast), options)
    })
}).end()

