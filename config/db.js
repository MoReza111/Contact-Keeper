const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to our DB'))
        .catch(err => {
            console.log(err)
            process.exit(1)
        })
}

module.exports = connectDB