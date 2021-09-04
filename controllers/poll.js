const mongoose = require('mongoose')
const poll = require('../models/poll')
const User = require('../models/user')

module.exports.getPoll = (req,res)=>{
    return res.render('poll',{
        title: 'Create your poll'
    })
}

module.exports.savePoll = async (req,res)=>{
    try {
        const newPoll = new poll(req.body)
        console.log('poll saved successfully')
        const savedPoll = await newPoll.save()

        console.log(savedPoll)

       // alert('https://localhost:3000/viewPagePoll/'+savedPoll.id)

        res.redirect('/viewPagePoll/'+savedPoll.id)

    } catch (error) {
        console.log('had hai ',error)
    }
    
}

module.exports.showPollPage =async (req,res)=>{    
    try {
        const findPoll = await poll.findById(req.params.id)
        res.render('pollPageView',{
            myPoll:findPoll,
            title:"Ha bol bhai",
            backid:undefined
        })
        
    } catch (error) {
        console.log(error)
    }
}


module.exports.storeUserResponse = async (req,res)=>{
    const _id = req.params.id
    console.log(_id)

    try {
        const PollName = await poll.findById(req.body.pollID)
        const option = req.body.Option
        console.log(option)

       const repeat= PollName.checkUser.find((obj)=> obj.UserID==_id)

       if(repeat)
       {
          console.log('kitna baar karega tm!')
          return res.render('pollPageView',{
              title:"Ha bol bhai",
              backid:_id

          })
       }
        const pair = {
            UserID:_id ,
            option:option          
        }


        PollName.checkUser.push(pair)

        switch (option) {
            case 'A':
                PollName.A+=1
                break;

            case 'B':
                PollName.B+=1
                break;
            case 'C':
                PollName.C+=1
                break;
            case 'D':
                PollName.D+=1
                break;
        
            default:
                console.log('Wrong Option',option)
                break;
        }

        await PollName.save()
             

        return res.render('pollPageView',{
            title:"Ha bol bhai",
            backid:_id
        })
        
            
    } catch(e){
        console.log(e)
    }
}


module.exports.showAllPolls = async (req,res)=>{

    
    try {
        const allPolls = await poll.find({})
        console.log(allPolls)

        res.render('viewAllPolls',{
            title:'View All Polls',
            allPolls
        })
        
        
    } catch (error) {
        res.redirect('back')
    }

}