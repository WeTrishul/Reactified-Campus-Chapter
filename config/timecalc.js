const express = require('express')
const moment = require('moment')

const startingTime = function(sec){

    var utcSeconds = sec;
    var d = new Date(0); 
    d.setUTCSeconds(utcSeconds);

    var date = new Date();
    date.setTime(d.valueOf() - 60000 * d.getTimezoneOffset());
    //console.log(date);

    const newdate = moment.utc(date).format('MM/DD/YYYY')
    return newdate
}
module.exports = startingTime