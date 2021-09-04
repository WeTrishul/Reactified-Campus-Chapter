const queue = require('../config/kue')
const forgotPasswordMailer = require('../mailers/forgotPassword_mailer')

queue.process('otp',function(job,done){
    console.log('otp worker is processing its assigned job',job.data)

    forgotPasswordMailer.forgot(job.data)
    done()
})