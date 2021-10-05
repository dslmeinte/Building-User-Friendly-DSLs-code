const { writeContents } = require("../backend/storage")
const { serialize } = require("../common/ast")
const rental = require("./example-AST")

writeContents(serialize(rental))

