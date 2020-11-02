const config = require('config')
const { body, validationResult } = require('express-validator')

const Contact = require('./../models/contactModel')

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user._id })
        res.status(200).json({
            status: 'success',
            contacts
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            status: 'error',
            msg: "Server Error"
        })
    }
}

exports.createContact = async (req, res) => {

}
