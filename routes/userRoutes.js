const express = require('express')
const { body, validationResult } = require('express-validator')

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/signup').post([
    body('name', 'Please add Name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], userController.signUp)

router.route('/user').get(authController.isLogin, userController.getUser)

module.exports = router