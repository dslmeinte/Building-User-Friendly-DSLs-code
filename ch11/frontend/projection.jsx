import React from "react"
import { action, observable } from "mobx"
import { observer } from "mobx-react"

import { isAstObject, newId, placeholderAstObject } from "../ast"
import { issuesFor } from "../constraints"
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


// Refactored-out component for 6th item in Exercise of §9.1.3:
const IssuesWrapper = (({ issues, className, children }) => <div title={issues.join("\n")} className={className}>
    {issues.length > 0 && <span className="issue-marker">&#9888;</span>}
    {children}
</div>)


const indefiniteArticleFor = (nextWord) => "a" + ((typeof nextWord === "string" && nextWord.match(/^[aeiou]/)) ? "n" : "")


// Exercise 11.5:
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
                // implementation of Exercise 11.4:
                "Binary Operation",
                "Number Literal"
            ]}
            placeholderText={`<${propertyName}>`}
            actionText={`(choose concept for ${propertyName})`}
        />
        : <Projection value={value}
              ancestors={[ astObject, ...ancestors ]}
              deleteValue={() => {
                  delete settings[propertyName]
              }}
        />
}


export const Projection = observer(({ value, deleteValue, ancestors }) => {
    if (isAstObject(value)) {
        const { settings } = value
        const editStateFor = (propertyName) => observable({
            value: settings[propertyName],
            inEdit: false,
            setValue: (newValue) => { settings[propertyName] = newValue }
        })
        const issues = issuesFor(value, ancestors)
        // (cases are in alphabetical order of concept labels:)
        switch (value.concept) {
            case "Attribute Reference": {
                const recordType = ancestors.find((ancestor) => ancestor.concept === "Record Type")
                const attributes = recordType.settings["attributes"]
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={deleteValue}>
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
                    </Selectable>
                </IssuesWrapper>
            }
            case "Attribute": return <IssuesWrapper issues={issues}>
                    <Selectable className="attribute" astObject={value} deleteAstObject={deleteValue}>
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
                                {/* Exercise 11.3: */}
                                <DropDownValue
                                    className="keyword"
                                    editState={editStateFor("value kind")}
                                    options={["initially", "computed as"]}
                                />&nbsp;
                                {/* Exercise 11.5: */}
                                {projectionExpressionFor(value, "value", ancestors)}
                            </div>
                            : <AddNewButton buttonText="+ value" actionFunction={() => {
                                settings["value"] = placeholderAstObject
                                // Exercise 11.3:
                                settings["value kind"] = "initially"
                            }} />
                        }
                    </Selectable>
            </IssuesWrapper>
            // Exercise 11.6:
            case "Binary Operation": {
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={deleteValue}>
                        {projectionExpressionFor(value, "left operand", ancestors)}&nbsp;
                        <DropDownValue
                            className="value enum-like"
                            editState={editStateFor("operator")}
                            options={["of", "-", "+", "/", "*"]}
                            placeholderText="<operator>"
                        />&nbsp;
                        {projectionExpressionFor(value, "right operand", ancestors)}
                    </Selectable>
                </IssuesWrapper>
            }
            case "Number Literal": {
                const attributeType = ancestors[0].concept === "Attribute" ? ancestors[0].settings["type"] : undefined
                return <IssuesWrapper issues={issues} className="inline">
                    <Selectable className="inline" astObject={value} deleteAstObject={deleteValue}>
                        {attributeType === "amount" && <span className="keyword">$</span>}
                        <NumberValue editState={editStateFor("value")} placeholderText="<number>" />
                        {attributeType === "percentage" && <span className="keyword">%</span>}
                        {attributeType === "period in days" && <span className="keyword">&nbsp;days</span>}
                    </Selectable>
                </IssuesWrapper>
            }
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
                                        deleteValue={() => {
                                            settings["attributes"].splice(index, 1)
                                        }}
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

