const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same!'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    // Hash the password with cost 12 
    this.password = await bcrypt.hash(this.password, 12)

    // Delete passwordConfirm field
    this.confirmPassword = undefined

    next()
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel