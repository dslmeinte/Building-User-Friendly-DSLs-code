const asClassNameArgument = (...classNames) =>
    classNames.filter((className) => typeof className === "string").join(" ")
module.exports.asClassNameArgument = asClassNameArgument

