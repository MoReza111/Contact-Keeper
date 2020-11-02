const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const config = require('config')
const { body, validationResult } = require('express-validator')

const User = require('./../models/userModel')

exports.login = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array()
        })
    }

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).select('+password')

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(400).json({
                status: 'fail',
                msg: 'Ivalid Credentials'
            })
        }

        // Remove the password from respond
        user.password = undefined

        const token = await jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 360000 })

        res.status(200).json({ token, user })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ err: 'server error' })
    }

}

exports.isLogin = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            msg: 'You are not logged in! Please log in to get access.'
        })
    }

    try {
        // Verification
        const decoded = await promisify(jwt.verify)(token, config.get('jwtSecret'))

        // Check if user still exists
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                msg: 'The user belonging to this Token does not exists'
            })
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            msg: 'Token is invalid'
        })
    }
}