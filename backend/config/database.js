const mongoose = require('mongoose')
const { DB_URL } = require('./env')


const connectDatabase = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('database connected.')
    })
}

module.exports = connectDatabase
