const { weekdays, months } = require("../runtime/dates")

/**
 * Determines whether the given time unit is a weekday('s name).
 */
const isWeekday = (timeUnit) =>
    weekdays.indexOf(timeUnit) > -1
module.exports.isWeekday = isWeekday

/**
 * Determines whether the given time unit is a month('s name).
 */
const isMonth = (timeUnit) =>
    months.indexOf(timeUnit) > -1
module.exports.isMonth = isMonth

/**
 * An array of strings containing all time units:
 * names of weekdays and months.
 */
const timeUnits = [ ...weekdays, ...months ]
module.exports.timeUnits = timeUnits

