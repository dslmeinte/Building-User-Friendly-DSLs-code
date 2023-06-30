const { makeAutoObservable } = require("mobx")

const weekdays = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
module.exports.weekdays = weekdays
const months = [ "January", "February", "March", "April", "May", "June", "July", "August",
                    "September", "October", "November", "December"
                ]
module.exports.months = months

const leftPad0 = (num, len) => {
    let str = "" + num
    if (str.length < len) {
        str = "0".repeat(len - str.length) + str
    }
    return str
}
const formatDate = (date) => `${leftPad0(date.getFullYear(), 4)}-${leftPad0(date.getMonth() + 1, 2)}-${leftPad0(date.getDate(), 2)}`
    // date.toString().substring(0, 10)  doesn't work...
module.exports.formatDate = formatDate


class DateRange {
    _from;
    _to;
    get from() {
        return this._from
    }
    set from(newValue) {
        this._from = newValue
        if (this._to < this._from) {
            this._to = this._from
        }
    }
    get to() {
        return this._to
    }
    set to(newValue) {
        this._to = newValue
        if (this._from > this._to) {
            this._from = this._to
        }
    }
    toString() {
        return `${formatDate(this._from)} - ${formatDate(this._to)}`
    }
    constructor(fromStr, toStr) {
        makeAutoObservable(this)
        const now = new Date()
        this._from = !!fromStr ? new Date(fromStr) : now
        this._to = !!toStr ? new Date(toStr) : now
    }
    containsWeekDay(dayName) {
        const dayNr = weekdays.indexOf(dayName)
        let currentDate = new Date(this._from)   // (copy)
        while (currentDate < this._to && currentDate.getDay() !== dayNr) {
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return currentDate.getDay() === dayNr && currentDate < this._to
    }
    startsInMonth(monthName) {
        const monthNr = months.indexOf(monthName)
        return this._from.getMonth() === monthNr
    }
}
module.exports.DateRange = DateRange

