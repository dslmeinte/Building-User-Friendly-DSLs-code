const { writeFileSync } = require("fs")
const { join } = require("path")

const rental = require("./Rental-AST")
const serialize = require("../ast").serialize

writeFileSync(
    join(__dirname, "data/contents.json"),
    JSON.stringify(serialize(rental), null, 2),
    { encoding: "utf8" }
)

