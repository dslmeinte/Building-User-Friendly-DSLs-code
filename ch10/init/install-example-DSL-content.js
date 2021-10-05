const { writeVersionedContents } = require("../backend/storage")
const { serialize } = require("../common/ast")
const rental = require("./example-AST")

writeVersionedContents(serialize(rental), "v1")

