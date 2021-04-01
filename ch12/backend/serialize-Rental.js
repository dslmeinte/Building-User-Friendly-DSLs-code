const { join } = require("path")

const { serialize } = require("../ast")
const { writeJson } = require("../file-utils")

const rental = require("./Rental-AST")


const dataPath = join(__dirname, "data")

writeJson(join(dataPath, "contents.json"), serialize(rental))
writeJson(join(dataPath, "metaData.json"), {})

const { setDslVersion } = require("./metaData")
setDslVersion("v2")

