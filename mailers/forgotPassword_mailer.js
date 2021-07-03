const nodemailer = require('../config/nodemailer')

exports.forgot = (email,token)=>{
    console.log('Inside forgot_mailer')
    const tokenVal = token

    nodemailer.transporter.sendMail({
        from:'team.weTrishul@gmail.com',
        to: email,
        subject:'Forgot password',
        html:'<p>Click <a href="http://localhost:3000/reset/password/'+ tokenVal + '"a>change karlo bhai</a></p>'              
    },(err,info)=>{
        if(err){
            console.log(email)
            console.log('Error in sending Mail', err)
            return
        }
        console.log('Messge successfully delivered!', info)
        return 
    })
}