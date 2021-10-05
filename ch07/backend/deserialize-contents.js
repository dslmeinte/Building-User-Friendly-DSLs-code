const { readContents } = require("./storage")
const { deserialize } = require("../common/ast")

const serializedAst = readContents()
const deserializedAst = deserialize(serializedAst)
require("../../ch03/print-pretty")(deserializedAst)

