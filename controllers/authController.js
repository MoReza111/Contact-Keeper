const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

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