const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/userauth-backend',{useNewUrlParser: true})
    .then(() => console.log('Connected succesfully to the DB'))
    .catch((err) => console.log('Error connecting to DB', err))

module.exports = { mongoose }    