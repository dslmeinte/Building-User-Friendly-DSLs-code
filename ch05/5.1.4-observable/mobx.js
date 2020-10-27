const { observable, spy } = require("mobx")


const someObject = {
    "prop1": "value0"
}

const someObservableObject = observable(someObject)


spy((change) => {
    console.dir(change)
})


someObservableObject["prop1"] = "value1"    // produces a spy'd update

console.log(someObject["prop1"])    // "value0": changes to someObservableObject don't affect someObject

someObject["prop2"] = "value2"  // doesn't produce a spy'd update

console.log(someObservableObject["prop2"])  // undefined: changes to someObject don't affect someObservableObject

