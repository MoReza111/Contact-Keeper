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
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array()
        })
    }
    const { name, email, phone, type } = req.body
    try {
        const contact = await Contact.create({ name, email, phone, type, user: req.user._id })

        res.status(200).json({
            status: 'success',
            contact
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ err: 'server error' })
    }
}

exports.updateContact = async (req, res) => {
    try {
        //const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)
        const contact = await Contact.findById(req.params.id)

        if (!contact) {
            return res.status(404).json({
                status: 'fail',
                msg: 'Contact not found'
            })
        }

        if (contact.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                msg: 'Not Authorized'
            })
        }

        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })

        res.status(200).json({
            status: 'success',
            contact: updatedContact
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: 'error', err: 'server error' })
    }
}