const express = require('express')
const { body, validationResult } = require('express-validator')

const userController = require('./../controllers/userController')

const router = express.Router()

router.route('/').post([
    body('name', 'Please add Name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], userController.signUp)

module.exports = router