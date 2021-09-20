const fetch = require('node-fetch')

module.exports.codeforecesRating = async(user)=>{
    try {
        const codeforcesData = await fetch('https://codeforces.com/api/user.info?handles='+user.codeforces).then(response=>response.json())
        const codeforcesRatings = codeforcesData.result[0].rating
        return codeforcesRatings
    } catch (error) {
      console.log('Error in fetching ratings from codeforces',error)  
      return 0;
    }
}

module.exports.codeChefRating = async(user)=>{
    try {
        const codechefData = await fetch('https://competitive-coding-api.herokuapp.com/api/codechef'+user.codechef).then(response=>response.json())
        const codechefRatings = codechefData.rating
        return codechefRatings
    } catch (error) {
      console.log('Error in fetching ratings from codeChef',error)  
      return 0;
    }
}

module.exports.leetCodeRating = async(user)=>{
    try {
        const leetcodeData = await fetch('https://competitive-coding-api.herokuapp.com/api/leetcode'+user.leetcode).then(response=>response.json())
        const leetcodeRatings = leetcodeData.contribution_points
        return leetcodeRatings
    } catch (error) {
      console.log('Error in fetching ratings from leetcode',error) 
      return 0; 
    }
}




