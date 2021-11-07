const dotenv = require('dotenv')

dotenv.config()

clientId = process.env.Client_ID
clientSecret = process.env.Client_Secret



module.exports = {
    clientId,
    clientSecret
}