const { join } = require("path")

const { readJson, writeJson } = require("../file-utils")
const { dslVersion } = require("./metaData")

const contentsPath = join(__dirname, "data/contents.json")

let contents = readJson(contentsPath)

const express = require("express")
const server = express()

server.get("/ast", (request, response) => {
    // for Exercise 10.4:
    response.header("X-DSL-Version", dslVersion())
    response.json(contents)
})

server.use(express.json({ limit: "1gb" }))
server.put("/ast", (request, response) => {
    const newContents = request.body
    writeJson(contentsPath, newContents)
    contents = newContents
    response.send()
})

// endpoint to generate src/runtime/index.jsx from contents:
const { generatedIndexJsx } = require("../generator/indexJsx-template")
const { deserialize } = require("../ast")
server.get("/ast/indexJsx", (request, response) => {
    response.set('Content-Type', 'text/plain')
    response.send(generatedIndexJsx(deserialize(contents)))
})

// needs to be after /ast routes:
const Parcel = require("parcel-bundler")
const bundler = new Parcel(join(__dirname, "../frontend/index.html"))
server.use(bundler.middleware())
// TODO  switch between development and production

const port = 8080
server.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}/`)
})

