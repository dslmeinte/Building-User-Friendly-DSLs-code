const { makeAutoObservable } = require("mobx")


const pad = (num, len) => {
    let str = "" + num
    if (str.length < len) {
        str = "0".repeat(len - str.length) + str
    }
    return str
}
const formatDate = (date) => `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`
    // date.toString().substring(0, 10)  doesn't work...
module.exports.formatDate = formatDate


class Period {
    // (Unfortunately, we have to deal with a syntax like this.)
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
}
module.exports.Period = Period

