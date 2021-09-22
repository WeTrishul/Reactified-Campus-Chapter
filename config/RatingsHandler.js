const Leaderboards = require('../models/Leaderboards')
const User = require('../models/user')
const fetch = require('node-fetch')
const fetchRatings = require('./fetchRatings')


getRatings=async (user)=>{
    try{
        // for codeforces 
        
        const codeforcesRatings = await fetchRatings.codeforecesRating(user)

        // 5 req in 1 sec
       
        //for codechef
        const codechefRatings = await fetchRatings.codeChefRating(user)

         // 6 req in 1 min

        //for leetcode
        const leetcodeRatings = await fetchRatings.leetCodeRating(user)

         // 5 req in 1 min

        console.log(codeforcesRatings)
        console.log(codechefRatings)
        console.log(leetcodeRatings)

        return codeforcesRatings + codechefRatings + parseInt(leetcodeRatings)
    }catch(error)
    {
        console.log('Could not fetch' + error)       
    }    
}

// var i = 0


const fun = async (allusers,i) =>{
      
  try {

    console.log('Idhar aaya')

    const overallrating = await getRatings(allusers[i])

    if(allusers[i].OverallRatings.length>=4)
    {
      allusers[i].OverallRatings = []
    }
    allusers[i].OverallRatings.push(overallrating)
    allusers[i].CurrentRating=overallrating
    allusers[i].save()
        console.log('done adding')

     

      // return i
      // if(i===allusers.length-1)
      // {
       
      //    return i
    
      // }
    
  } catch (error) {

    console.log('Node ke bas ka nahi' + error)
    
  }
 

  
  }

module.exports.updateRatingsOfAllUsers = async ()=>{
//  var allusers = []
//   await User.find({},(error,user)=>{
//     allusers = user
//   }) 

 

  // allusers.forEach(async (user)=>{

    // console.log(allusers[0])
  
  try {
    const allusers = await User.find({})

    var i = 0
    
   var c =  setInterval(()=>{
      
    fun(allusers,i)
    if(++i==allusers.length)
    {
      clearInterval(c)
    }
    
    

    }
      ,15000)

    
     
    
  } catch (error) {
    console.log(error)
  }
  
  

// })
  
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