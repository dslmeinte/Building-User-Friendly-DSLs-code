const asClassNamesArgument = (...classNames) => classNames.filter((className) => typeof className === "string").join(" ")
module.exports.asClassNamesArgument = asClassNamesArgument

