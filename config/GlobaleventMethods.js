const fetch = require('node-fetch')
const timecalc = require('../config/timecalc');
const { events } = require('../models/user');



module.exports.codeforcesevents = async () =>{

    const UpcomingEvents = await fetch('https://codeforces.com/api/contest.list').then(response => response.json());
    const arr=[]
    UpcomingEvents.result.forEach(event => {
        if(event.phase !=="FINISHED" && event.phase !=="PENDING_SYSTEM_TEST")
        {
            event.startTimeSeconds=timecalc.startingTime(event.startTimeSeconds)
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


module.exports.codeChefEvents = async () =>{

  const UpcomingEvents = await fetch('https://kontests.net/api/v1/code_chef').then(response => response.json());
  var arr=[]
  UpcomingEvents.forEach(event => {
        if(event.status==='BEFORE')
        {
            var date = timecalc.convertUTCDateToLocalDate(new Date(event.start_time))
            event.start_time=date.toLocaleString()
            arr.push(event)  
        }
                   
  });
  const eventsArray = arr
  
  return eventsArray
}