const { writeFileSync } = require("fs")
const { join } = require("path")

const rental = require("./Rental-AST")
const { serialize } = require("../ast")

writeFileSync(
    join(__dirname, "data/contents.json"),
    JSON.stringify(serialize(rental), null, 2),
    { encoding: "utf8" }
)


writeFileSync(
    join(__dirname, "data/metaData.json"),
    "{}",
    { encoding: "utf8" }
)

const { setDslVersion } = require("./metaData")
setDslVersion("v1")

