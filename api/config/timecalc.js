const express = require('express')
const moment = require('moment')

module.exports.startingTime = (sec)=>{

    var utcSeconds = sec;
    var d = new Date(0); 
    d.setUTCSeconds(utcSeconds);

    var date = new Date();
    date.setTime(d.valueOf() - 60000 * d.getTimezoneOffset());
    

    const newdate = moment.utc(date).format('MM/DD/YYYY')
    return newdate
}


module.exports.convertUTCDateToLocalDate= (date)=>{
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}