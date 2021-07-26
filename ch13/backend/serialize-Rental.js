const { serialize } = require("../common/ast")
const { writeVersionedContents } = require("./storage")
const rental = require("./Rental-AST")

writeVersionedContents(serialize(rental), "v2")

