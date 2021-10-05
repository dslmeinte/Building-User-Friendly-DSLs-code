import React from "react"

import { isAstObject } from "../common/ast"


export const Projection = ({ astObject }) => {
    if (isAstObject(astObject)) {
        switch (astObject.concept) {
            default: return <em>{"No projection defined for concept: " + astObject.concept}</em>
        }
    }
    return <em>{"No projection defined for value: " + astObject}</em>
}

