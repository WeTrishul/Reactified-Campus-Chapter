const queue = require('../config/kue')
const login_mailer = require('../mailers/login_mailer')

queue.process('emails',function(job,done){
    console.log('emails worker is processing its assigned job',job.data)

    login_mailer.newLogin(job.data)
    done()
})