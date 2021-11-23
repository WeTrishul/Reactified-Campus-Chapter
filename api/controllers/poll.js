const mongoose = require('mongoose')
const poll = require('../models/poll')
const User = require('../models/user')

module.exports.getPoll = (req,res)=>{

    if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }

    return res.render('poll',{
        title: 'Create your poll'
    })
}

module.exports.savePoll = async (req,res)=>{
    try {

        // if(!req.isAuthenticated())
        // {
        //   return  res.redirect('/login')
        // }

        const newPoll = new poll(req.body)
        console.log('poll saved successfully')
        const savedPoll = await newPoll.save()

        console.log(savedPoll)

       // alert('https://localhost:3000/viewPagePoll/'+savedPoll.id)

       return res.status(200).json({
        data: {
            done:"yes",
            
        },
        message: "Applied Successfully!"
    });

        // res.redirect('/viewPagePoll/'+savedPoll.id)

    } catch (error) {
        console.log('had hai ',error)
        res.redirect('back')
    }
    
}

module.exports.showPollPage =async (req,res)=>{    
    try {

        if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }

        const findPoll = await poll.findById(req.params.id)
        res.render('pollPageView',{
            myPoll:findPoll,
            title:"Ha bol bhai",
            backid:undefined
        })
        
    } catch (error) {
        console.log(error)
        res.render('error_page')
    }
}


module.exports.storeUserResponse = async (req,res)=>{
    

    try {

        if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }

        const _id = req.params.id
        console.log(_id)

        const PollName = await poll.findById(req.body.pollID)
        const option = req.body.Option
        console.log(option)

       const repeat= PollName.checkUser.find((obj)=> obj.UserID==_id)

       if(repeat)
       {
          console.log('kitna baar karega tm!')

          const arr = [PollName.A,PollName.B,PollName.C,PollName.D]
        console.log(arr)
          return res.render('pollPageView',{
              title:"Ha bol bhai",
              backid:_id,
              arr:arr
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
            backid:_id,
            arr: [PollName.A,PollName.B,PollName.C,PollName.D]
        })
        
            
    } catch(e){
        console.log(e)
        res.redirect('back')
    }
}


module.exports.showAllPolls = async (req,res)=>{

    
    try {

        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }

        const allPolls = await poll.find({})
        console.log(allPolls)

        // res.render('viewAllPolls',{
        //     title:'View All Polls',
        //     allPolls
        // })
        return res.status(200).json({
            data: {
                done:"yes",
                allPolls
            },
            message: "Applied Successfully!"
        });
        
    } catch (error) {
        res.render('error_page')
    }

}