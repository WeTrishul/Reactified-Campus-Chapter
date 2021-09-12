const fetch = require('node-fetch')
const startingTime = require('../config/timecalc')


module.exports.codeforcesevents = async () =>{

    const UpcomingEvents = await fetch('https://codeforces.com/api/contest.list').then(response => response.json());
    const arr=[]
    UpcomingEvents.result.forEach(event => {
        if(event.phase !=="FINISHED" && event.phase !=="PENDING_SYSTEM_TEST")
        {
            event.startTimeSeconds=startingTime(event.startTimeSeconds)
            arr.push(event)
        }            
    });
    const arr1 = arr.reverse()
    const eventsArray = arr
    
    // res.render('globalevents',{
    //     result: eventsArray
    // })

    return eventsArray
}