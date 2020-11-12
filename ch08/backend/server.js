const { readFile, writeFileSync } = require("fs")
const { join } = require("path")

const options = { encoding: "utf8" }

const contentsPath = join(__dirname, "contents.json")

let contents = null

readFile(contentsPath, options, (_, data) => {
    contents = JSON.parse(data)

    const express = require("express")
    const server = express()

    server.get("/ast", (request, response) => {
        response.json(contents)
    })

    server.use(express.json({ limit: "1gb" }))
    server.put("/ast", (request, response) => {
        const newContents = request.body
        writeFileSync(contentsPath, JSON.stringify(newContents, null, 2), options)
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
})

