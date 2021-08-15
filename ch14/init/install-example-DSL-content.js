const { serialize } = require("../common/ast")
const { writeVersionedContents } = require("../backend/storage")
const rental = require("./example-AST")

writeVersionedContents(serialize(rental), "v2")

