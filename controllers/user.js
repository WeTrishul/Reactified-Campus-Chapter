const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')




module.exports.getlogin=(req,res)=>{

   /* if(!req.cookies.username)
    {
        res.render('login',{
            title:'Login'
        })
    }
    else
    {
    res.redirect('back')
    }*/

    if(req.isAuthenticated())
    {
    res.redirect('/dashboard')  
    }
else
{
    res.render('login',{
        title:'login'
    })
}
}

module.exports.postlogin = (req,res)=>{
    
    /*const username=req.body.username
    try {
        const user = await User.findOne({username})
        const password = user.password;
            if(password===req.body.password)
            {
                console.log('Logged In successfully')
                res.cookie('username',username)
               res.redirect('/dashboard')
            console.log('Dashboard from ejs')
            }
            else{
                res.redirect('/login')
            }
        }
        catch (error) {
            res.redirect('/login')
    }*/
    res.redirect('/dashboard')
}

module.exports.getsignup = (req,res)=>{
   /* if(!req.cookies.username)
    {
    res.render('signup',{
        title:'signup'
    })
}
else
{
    res.redirect('back')
}*/

if(req.isAuthenticated())
{
  res.redirect('/dashboard')  
}
else
{
    res.render('signup',{
        title:'signup'
    })
}

}

module.exports.postsignup = async (req,res)=>{

    
        const user = new User(req.body)

        try {
            await user.save()
            console.log('User created successfully')
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.redirect('back')
        }
    }

module.exports.dashboard =  (req,res)=>{
    /*if(!req.cookies.username)
    {
        res.redirect('/login')
    }*/
   // else
    //{
       /* try {
            const user = await User.findOne({username:req.cookies.username})
        res.render('dashboard',{
            title:'Dashboard',
            value:user.name
        })
        } catch (error) {
            res.redirect('/login')
        }*/
        res.render('dashboard',{
            title:'Dasboard'
        })
   // }


}

module.exports.logout = (req,res)=>{
    /*if(req.isAuthenticated())
    {   res.clearCookie('user');
        res.redirect('/login')
    }*/
    req.logout();
  res.redirect('/login');
}



