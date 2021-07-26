const { isAstObject, isAstReference } = require("../common/ast")

const isNumberType = (type) => (type === "amount" || type === "percentage")
module.exports.isNumberType = isNumberType

const untype = "untype"
module.exports.untype = untype

const typeOfBinaryOperation = (operator, leftType, rightType) => {
    switch (operator) {
        case "-": {
            if (isNumberType(leftType)) {
                return leftType
            }
            if (leftType === untype && isNumberType(rightType)) {
                return rightType
            }
            return untype
        }
        case "of": return rightType === "amount" ? rightType : untype
        default: return untype
    }
}

const typeOfAttribute = (attribute) => attribute.settings["type"]

const typeOf = (astObject, ancestors) => {
    if (!isAstObject(astObject)) {
        return untype
    }
    const { settings } = astObject
    const nextAncestors = [ astObject, ...ancestors ]
    switch (astObject.concept) {
        case "Attribute": return typeOfAttribute(astObject)
        case "Attribute Reference": return isAstReference(settings["attribute"])
            ? typeOfAttribute(settings["attribute"].ref)
            : untype
        case "Binary Operation": {
            const leftType = typeOf(settings["left operand"] , nextAncestors)
            const rightType = typeOf(settings["right operand"] , nextAncestors)
            return typeOfBinaryOperation(settings["operator"], leftType, rightType)
        }
        case "Number": {
            if (ancestors.length === 0) {
                return untype
            }
            const parent = ancestors[0]
            if (parent.concept === "Attribute") {
                return typeOfAttribute(parent)
            }
            return untype
        }
        case "Parentheses": return typeOf(settings["sub"] , ancestors)
        default: return untype
    }
}
module.exports.typeOf = typeOf

