const Leaderboards = require('../models/Leaderboards')
const User = require('../models/user')
const fetch = require('node-fetch')


module.exports.getRatings=async (user)=>{
    try{
        // for codeforces 
        const codeforcesData = await fetch('https://codeforces.com/api/user.info?handles='+user.codeforces).then(response=>response.json())
        const codeforcesRatings = codeforcesData.result[0].rating
       
        //for codechef
        const codechefRatings = 0
        //for hackkerank
        const hackerrankRatings = 0


        return codeforcesRatings + codechefRatings + hackerrankRatings

    }catch(error)
    {
        console.log('Could not fetch' + error)       
    }    
}


module.exports.updateRatingsOfAllUsers = async ()=>{
//  var allusers = []
//   await User.find({},(error,user)=>{
//     allusers = user
//   }) 

  const allusers = await User.find({})

  allusers.forEach(async (user)=>{
    const overallrating = await this.getRatings(user)

   if(user.OverallRatings.length>=4)
   {
     user.OverallRatings = []
   }
   user.OverallRatings.push(overallrating)
       user.CurrentRating=overallrating
       user.save()
       console.log('done adding')

})
  
  // allusers.forEach(async (user)=>{
  //      const overallrating = await this.getRatings(user)
  //      User.findById(user._id,async(error,user)=>{
  //        if(user.OverallRatings.length>=4)
  //         {
  //           await User.update({username:user.username}, { $set: { OverallRatings: [] }}, function(err, affected){
  //               console.log('affected: ', affected);
  //           });
  //         }
  //         user.OverallRatings.push(overallrating)
  //         user.CurrentRating=overallrating
  //         user.save()
  //         console.log('done adding')
  //     })

  // })


}


module.exports.updateLeaderboards = async () =>{

        // var allusers = []

        // await User.find({},(error,users)=>{
        //     allusers=users
        // })
        const allusers = await User.find({})
        console.log(allusers.length)
        
        allusers.sort(compare)

        await Leaderboards.deleteMany({})

        allusers.forEach(async (user)=>{
                  const updateduser = {
                      userid:user._id,
                      CurrentRating:user.CurrentRating
                  }
                 await Leaderboards.create(updateduser,(error,result)=>{
                      if(error){return console.log('cannot insert')}
                  })
              })

        // Leaderboards.deleteMany({},(error,lboard)=>{
        //     if(error){return console.log('cannot delete')}
        //     allusers.forEach(async (user)=>{

        //         const updateduser = {
        //             userid:user._id,
        //             CurrentRating:user.CurrentRating
        //         }
               
        //        await Leaderboards.create(updateduser,(error,result)=>{
        //             if(error){return console.log('cannot insert')}
        //         })
        //     })
        // })  

        console.log("Leaderboards updated")

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