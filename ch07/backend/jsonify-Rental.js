const { writeFileSync } = require("fs")
const { join } = require("path")

const rental = require("../../ch03/listing3.2")

writeFileSync(
    join(__dirname, "data/contents.json"),
    JSON.stringify(rental, null, 2),
    { encoding: "utf8" }
)

