const app = require('./app')

const connectDB = require('./config/db')

// Connect DB
connectDB()


const port = process.env.PORT | 5000
app.listen(port, () => console.log(`listening on port ${port}`))