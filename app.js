const express = require('express')

const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const contactRouter = require('./routes/contactRoutes')

const app = express()

// Define Routes
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/contacts', contactRouter)


module.exports = app