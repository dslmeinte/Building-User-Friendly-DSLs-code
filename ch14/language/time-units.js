const { weekDays, months } = require("../runtime/dates")

/**
 * Determines whether the given time unit is a week day('s name).
 */
const isWeekDay = (timeUnit) => weekDays.indexOf(timeUnit) > -1
module.exports.isWeekDay = isWeekDay

/**
 * Determines whether the given time unit is a month('s name).
 */
const isMonth = (timeUnit) => months.indexOf(timeUnit) > -1
module.exports.isMonth = isMonth

const timeUnits = [ ...weekDays, ...months ]
module.exports.timeUnits = timeUnits

