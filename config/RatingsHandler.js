const Leaderboards = require('../models/Leaderboards')
const User = require('../models/user')
const fetch = require('node-fetch')


module.exports.getRatings=async (user)=>{
    try{
        // for codeforces 
        const codeforcesData = await fetch('https://codeforces.com/api/user.info?handles='+user.codeforces).then(response=>response.json())
        const codeforcesRatings = codeforcesData.result[0].rating
        // console.log(codeforcesRatings)  


        return codeforcesRatings

    }catch(error)
    {
        console.log('Could not fetch' + error)       
    }    
}


module.exports.updateRatingsOfAllUsers = async ()=>{
 var allusers = []
  await User.find({},(error,user)=>{
    allusers = user
  }) 
  
  allusers.forEach(async (user)=>{
       const overallrating = await this.getRatings(user)
       User.findById(user._id,async(error,user)=>{
         if(user.OverallRatings.length>=4)
          {
            await User.update({username:user.username}, { $set: { OverallRatings: [] }}, function(err, affected){
                console.log('affected: ', affected);
            });
          }
          user.OverallRatings.push(overallrating)
          user.CurrentRating=overallrating
          user.save()
          console.log('done adding')
      })

  })



}


module.exports.updateLeaderboards = async () =>{

        var allusers = []

        await User.find({},(error,users)=>{
            allusers=users
        })

        allusers.sort(compare)
       
        Leaderboards.deleteMany({},(error,lboard)=>{
            if(error){return console.log('cannot delete')}
            allusers.forEach(async (user)=>{

                const updateduser = {
                    userid:user._id,
                    CurrentRating:user.CurrentRating
                }
               
               await Leaderboards.create(updateduser,(error,result)=>{
                    if(error){return console.log('cannot insert')}
                })
            })
        })  

        // console.log(allusers)

}


const compare = ( a, b ) =>{
    
    if ( parseInt(a.CurrentRating) < parseInt(b.CurrentRating) ){
      return 1;
    }
    if ( parseInt(a.CurrentRating) > parseInt(b.CurrentRating) ){
      return -1;
    }
    return 0;
  }
  