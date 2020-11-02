const express = require('express')
const { body, validationResult, check } = require('express-validator')

const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/login').post([
    check('email', 'Please include a vaild email').isEmail(),
    check('password', 'Password is required').exists()
], authController.login)

module.exports = router