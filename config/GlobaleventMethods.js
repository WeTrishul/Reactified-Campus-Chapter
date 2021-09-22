const fetch = require('node-fetch')
const timecalc = require('../config/timecalc');
const upcomingEvents = require('../models/UpcomingEvents')
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


    let eventsData = await upcomingEvents.find({})

       if(!eventsData.length)
          {
              const temp = await upcomingEvents.create({})
              eventsData.push(temp)
          }

      eventsData[0].codeforces=eventsArray

      await eventsData[0].save()
      console.log('Ghusane k baad codeForces',eventsData[0].codeforces)
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

  let eventsData = await upcomingEvents.find({})

  if(!eventsData.length)
          {
              const temp = await upcomingEvents.create({})
              eventsData.push(temp)
          }
      
      eventsData[0].codechef=eventsArray

      await eventsData[0].save()

      console.log('Ghusane k baad codeChef',eventsData[0].codeforces)
}