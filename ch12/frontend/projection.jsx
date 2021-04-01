import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

import { astObject, isAstObject, newId, placeholderAstObject, setSingleValue, setInMultipleValue } from "../ast"
import { issuesFor } from "../constraints"
import { requiresParentheses } from "../operators"
import { Selectable } from "./selectable"
import { DropDownValue, NumberValue, TextValue } from "./value-components"


const AddNewButton = ({ buttonText, actionFunction }) =>
    <button
        className="add-new"
        tabIndex={-1}
        onClick={action((event) => {
            event.stopPropagation()
            actionFunction()
        })}
    >{buttonText}</button>


const IssuesWrapper = (({ issues, className, children }) => <div title={issues.join("\n")} className={className}>
    {issues.length > 0 && <span className="issue-marker">&#9888;</span>}
    {children}
</div>)


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.match(/^[aeiou]/)) ? "n" : "")


const projectionExpressionFor = (astObject, propertyName, ancestors) => {
    const { settings } = astObject
    const value = settings[propertyName]
    return (value === undefined || value === placeholderAstObject)
        ? <DropDownValue
            editState={observable({
                setValue: (newValue) => {
                    settings[propertyName] = observable({
                        id: newId(),
                        concept: newValue,
                        settings: {}
                    })
                }
            })}
            options={[
                "Attribute Reference",
                "Binary Operation",
                "Number Literal",
                // Implementation of Exercise 12.1:
                "Parentheses"
            ]}
            placeholderText={`<${propertyName}>`}
            actionText={`(choose concept for ${propertyName})`}
        />
        : <Projection value={value}
              ancestors={[ astObject, ...ancestors ]}
              setValue={setSingleValue(astObject, propertyName)}
        />
}


// Exercise 12.11:
export const SideTransformable = observer(({ leftTransform, rightTransform, children }) => {
    return <div className="side-transformable">
        {leftTransform && <span className="side-transform" onClick={action(leftTransform)}>&larr;</span>}
        {children}
        {rightTransform && <span className="side-transform" onClick={action(rightTransform)}>&rarr;</span>}
    </div>
})


export const Projection = observer(({ value, setValue, ancestors }) => {    // FIXME backpropagate deleteValue -> setValue !!!
    if (isAstObject(value)) {
        const { settings } = value
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })
        const issues = issuesFor(value, ancestors)
        // Exercise 12.12:
        const leftTransform = () => { setValue(astObject("Binary Operation", { "right operand": value })) }
        const rightTransform = () => { setValue(astObject("Binary Operation", { "left operand": value })) }
        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {
            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={setValue}>
                        {/* Exercise 12.11 & 12.12: */}
                        <SideTransformable leftTransform={leftTransform} rightTransform={rightTransform}>
                            <span className="keyword">the </span>
                            <DropDownValue
                                editState={observable({
                                    // Only navigate reference relation when there's one:
                                    value: settings["attribute"] && settings["attribute"].ref.settings["name"],
                                    inEdit: false,
                                    setValue: (newValue) => {
                                        settings["attribute"] = {
                                            ref: attributes.find((attribute) => attribute.settings["name"] === newValue)
                                        }
                                    }
                                })}
                                className="data-reference"
                                options={attributes.map((attribute) => attribute.settings["name"])}
                                actionText="(choose an attribute to reference)"
                                placeholderText="<attribute>"
                            />
                        </SideTransformable>
                    </Selectable>
                </IssuesWrapper>
            }
            case "Attribute": return <IssuesWrapper issues={issues}>
                    <Selectable className="attribute" astObject={value} deleteAstObject={setValue}>
                        <span className="keyword">the</span>&nbsp;
                        <TextValue editState={editStateFor("name")} placeholderText="<name>"/>&nbsp;
                        <span className="keyword">is {indefiniteArticleFor(settings["type"])}</span>&nbsp;
                        <DropDownValue
                            className="value enum-like"
                            editState={editStateFor("type")}
                            options={["amount", "percentage", "period in days"]}
                            placeholderText="<type>"
                        />&nbsp;
                        {settings["value"]
                            ? <div className="inline">
                                <DropDownValue
                                    className="keyword"
                                    editState={editStateFor("value kind")}
                                    options={["initially", "computed as"]}
                                />&nbsp;
                                {projectionExpressionFor(value, "value", ancestors)}
                            </div>
                            : <AddNewButton buttonText="+ value" actionFunction={() => {
                                settings["value"] = placeholderAstObject
                                settings["value kind"] = "initially"
                            }} />
                        }
                    </Selectable>
            </IssuesWrapper>
            case "Binary Operation": {
                // Exercise 12.5:
                const hasVirtualParentheses = requiresParentheses(value, ancestors[0])
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={setValue}>
                        {hasVirtualParentheses && <span className="keyword">(</span>}
                        {projectionExpressionFor(value, "left operand", ancestors)}&nbsp;
                        <DropDownValue
                            className="value enum-like"
                            editState={editStateFor("operator")}
                            options={["of", "-", "+", "/", "*", "^"]}
                            placeholderText="<operator>"
                        />&nbsp;
                        {projectionExpressionFor(value, "right operand", ancestors)}
                        {hasVirtualParentheses && <span className="keyword">)</span>}
                    </Selectable>
                </IssuesWrapper>
            }
            case "Number Literal": {
                // Exercise 12.3:
                const attributeType = ancestors[0].concept === "Attribute" ? ancestors[0].settings["type"] : undefined
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={setValue}>
                        {/* Exercise 12.10 & 12.12: */}
                        <SideTransformable leftTransform={leftTransform} rightTransform={rightTransform}>
                        {/*<div className="side-transformable">*/}
                            {attributeType === "amount" && <span className="keyword">$</span>}
                            <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                            {attributeType === "percentage" && <span className="keyword">%</span>}
                            {attributeType === "period in days" && <span className="keyword">&nbsp;days</span>}
                            {/*
                            <span className="side-transform" onClick={action(() => {
                                setValue(astObject("Binary Operation", { "left operand": value }))
                            })}>&rarr;</span>
                            */}
                        {/*</div>*/}
                        </SideTransformable>
                    </Selectable>
                </IssuesWrapper>
            }
            // Implementation of Exercise 12.1:
            case "Parentheses": return <Selectable className="inline" astObject={value} deleteAstObject={setValue}>
                {/* Exercise 12.11 & 12.12: */}
                <SideTransformable leftTransform={leftTransform} rightTransform={rightTransform}>
                    <span className="keyword">(</span>
                    {projectionExpressionFor(value, "sub", ancestors)}
                    <span className="keyword">)</span>
                </SideTransformable>
            </Selectable>
            case "Record Type": return <IssuesWrapper issues={issues}>
                <Selectable astObject={value}>
                    <div>
                        <span className="keyword">Record Type</span>&nbsp;
                        <TextValue editState={editStateFor("name")} placeholderText="<name>" />
                    </div>
                    <div className="attributes">
                        <div><span className="keyword">attributes:</span></div>
                        {settings["attributes"].map((attribute, index) =>
                            <Projection value={attribute} key={index} ancestors={[ value, ...ancestors ]}
                                setValue={setInMultipleValue(value, "attributes", index)}
                            />
                        )}
                        <AddNewButton buttonText="+ attribute" actionFunction={() => {
                            settings["attributes"].push({
                                id: newId(),
                                concept: "Attribute",
                                settings: {}
                            })
                        }} />
                    </div>
                </Selectable>
            </IssuesWrapper>
            case "Table": return <div className="table">
                {settings["rows"].map((attribute, index) =>
                    <Projection value={attribute} key={index} ancestors={[ value, ...ancestors ]} />
                )}
            </div>
            case "Table Row": return <div>
                {settings["items"].map((attribute, index) =>
                    <div key={index} >
                        <Projection value={attribute} ancestors={[ value, ...ancestors ]} />
                    </div>
                )}
            </div>
            default: return <div>
                <em>{"No projection defined for concept: " + value.concept}</em>
            </div>
        }
    }
    return <em>{"No projection defined for value: " + value}</em>
})

