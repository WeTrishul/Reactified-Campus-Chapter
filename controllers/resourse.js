const resourses = require('../models/resourses')
const User = require('../models/user')

const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const Event = require('../models/events')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const cloudinary = require('../config/cloudinary')
const multer = require('multer')
const path=require('path')
const fs =require('fs')

module.exports.getresoursePage = async(req,res)=>{
    const category = req.params.category
    let cat_data = await resourses.find({})

                 if(!cat_data.length)
                    {
                        const temp = await resourses.create({})
                        cat_data.push(temp)
                    }
    try {

        let categoryArray=[]
        if(category==='DSA')
        {
            categoryArray = cat_data[0].dsa
        }
       else if(category==='CP')
        {
            categoryArray = cat_data[0].cp
        }
        else if(category==='APTI')
        {
            categoryArray = cat_data[0].apti
        }
        else if(category==='PLACEMENTS')
        {
            categoryArray = cat_data[0].placements
        }
        else if(category==='GATE')
        {
            categoryArray = cat_data[0].gate
        }
        else if(category==='CORE')
        {
            categoryArray = cat_data[0].coresub
        }
        else
        {
            categoryArray = cat_data[0].dev
        }

        console.log(categoryArray)
        res.render('viewResourceList',{
            title:'hello',
            arr:categoryArray,
            l:categoryArray.length
        })
    } catch (error) {
        console.log('resources nhi dikha pa rha hai',error)
        res.redirect('back')
    }
}


module.exports.getuploadPage =  (req,res)=>{
    res.render('viewUploadPage',{
        title:'hello'
    })
}

module.exports.postresourses = async(req,res)=>{
        
    try {
        var paths,arr=[];
        resourses.uploadedResources(req,res,async function(error){

            try {

                const _id = req.params.id
                const category = req.body.patanhi
                console.log('category',category)
                console.log(req.body.flag)
                const name = req.body.name
                let catData = await resourses.find({})

                 if(!catData.length)
                    {
                        const temp = await resourses.create({})
                        catData.push(temp)
                    }
                console.log(catData)
                let user = await User.findOne({_id})
                
                if(error)
            {
                console.log('******Multer Error*****'+error.message)  
                if (req.body){
                
                    console.log('yahan aagya')
                    return res.status(200).json({
                        data: {
                            done: 'no'
                        },
                        message: "nhi hua!"
                    });
                }
            }
           if(req.files[0])
           { 
                paths = resourses.resourcesPath+'/'+ req.files[0].filename+','
               for(var i=1;i<req.files.length;i++)
            {
                    paths = paths + resourses.resourcesPath+'/'+ req.files[i].filename + ','
            }    
                var LastIndexOfComma = paths.lastIndexOf(',')
                paths = paths.substr(0,LastIndexOfComma)

                arr =  paths.split(',')

                console.log(arr)

                switch (category) {
                        case 'DSA':
                        arr.forEach((ele,i=1) =>{
                            var fileName= name+' '+i;
                            catData[0].dsa.push({ele,user:user.username,name:fileName})
                            i++;
                        })
                        break;
                        case 'APTI':
                        arr.forEach(ele => catData[0].apti.push({ele,user:user.username,name:name}))
                        break;
                        case 'DEV':
                        arr.forEach(ele => catData[0].dev.push({ele,user:user.username,name:name}))
                        break;
                        case 'PLACEMENTS':
                        arr.forEach(ele => catData[0].placements.push({ele,user:user.username,name:name}))
                        break;
                        case 'CP':
                        arr.forEach(ele => catData[0].cp.push({ele,user:user.username,name:name}))
                        break;
                        case 'GATE':
                        arr.forEach(ele => catData[0].gate.push({ele,user:user.username,name:name}))
                        break;
                        case 'CORE':
                        arr.forEach(ele => catData[0].coresub.push({ele,user:user.username,name:name}))
                        break;
                    default:
                        console.log(category)
                        break;
                }

                console.log(catData[0])
                await catData[0].save()

                if (req.body.flag){
                
                    console.log('yahan aagya 1')
                    return res.status(200).json({
                        data: {
                            done: 'yes'
                        },
                        message: "uploaded!"
                    });
                }   
           }
            } catch (error) {
                console.log('ajax ka natak',error)
            }  
        })     
    }catch (error) {
        console.log('Error'+error)
        res.redirect('/dashboard')
    }
}