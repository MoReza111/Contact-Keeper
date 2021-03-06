const express = require('express')
const { body, validationResult } = require('express-validator')

const authController = require('./../controllers/authController')
const contactController = require('./../controllers/contactController')

const router = express.Router()

router.use(authController.isLogin)
router.route('/').get(contactController.getContacts)
router.route('/').post([body('name', 'Name is required').not().isEmpty()], contactController.createContact)
router.route('/:id').put([body('name', 'Name is required').not().isEmpty()], contactController.updateContact)
router.route('/:id').delete(contactController.deleteContact)

module.exports = router