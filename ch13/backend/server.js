const { readVersionedContents, writeContents } = require("./storage")

const versionedContents = readVersionedContents()
const dslVersion = versionedContents.version    // (This implies: no AST migrations while the server is running.)
let contents = versionedContents.contents

const express = require("express")
const server = express()

server.get("/contents", (request, response) => {
    response.header("X-DSL-Version", dslVersion)
    response.json(contents)
})

server.use(express.json({ limit: "1gb" }))
server.put("/contents", (request, response) => {
    const newContents = request.body
    writeContents(newContents)
    contents = newContents
    response.send()
})

// endpoint to generate src/runtime/index.jsx from contents:
const { generatedIndexJsx } = require("../generator/indexJsx-template")
const { deserialize } = require("../common/ast")
server.get("/contents/indexJsx", (request, response) => {
    response.set("Content-Type", "text/plain")
    response.send(generatedIndexJsx(deserialize(contents)))
})

const { join } = require("path")
server.use(express.static(join(__dirname, "..", "dist")))

const port = 8080
server.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}/`)
})

