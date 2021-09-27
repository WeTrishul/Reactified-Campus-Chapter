const queue = require('../config/kue')
const signUpMailer = require('../mailers/signup_mailer')

queue.process('signupVerify',function(job,done){
    console.log('Signup otp worker is processing its assigned job',job.data)

    signUpMailer.signup(job.data)
    done()
})