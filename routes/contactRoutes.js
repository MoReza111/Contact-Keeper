const express = require('express')

const authController = require('./../controllers/authController')
const contactController = require('./../controllers/contactController')

const router = express.Router()

router.use(authController.isLogin)
router.route('/').get(contactController.getContacts)


module.exports = router