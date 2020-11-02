const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('./../models/userModel')

exports.signUp = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array()
        })
    }

    const { name, email, password, confirmPassword } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                status: 'fail',
                msg: 'User already exists'
            })
        }

        const newUser = await User.create({ name, email, password, confirmPassword })

        const token = await jwt.sign({ id: newUser._id }, config.get('jwtSecret'), { expiresIn: 360000 })

        res.status(200).json({ token, user: newUser })

    } catch (err) {
        console.log(err.message)
        if (err.errors.confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                error: err.errors.confirmPassword.properties.message
            })
        }
        res.status(500).json({ err: 'server error' })
    }
}

exports.getUser = async (req, res) => {
    res.status(200).json({
        status: 'success',
        user: req.user
    })
}