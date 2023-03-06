const { weekDays, months } = require("../runtime/dates")

/**
 * Determines whether the given time unit is a week day('s name).
 */
const isWeekDay = (timeUnit) =>
    weekDays.indexOf(timeUnit) > -1
module.exports.isWeekDay = isWeekDay

/**
 * Determines whether the given time unit is a month('s name).
 */
const isMonth = (timeUnit) =>
    months.indexOf(timeUnit) > -1
module.exports.isMonth = isMonth

/**
 * An array of strings containing all time units:
 * names of week days and months.
 */
const timeUnits = [ ...weekDays, ...months ]
module.exports.timeUnits = timeUnits

