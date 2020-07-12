// Import mongoose module/package
const mongoose = require('mongoose')
const validator = require('validator');
const { request } = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Create userSchema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
               throw new Error('Invalid email!') 
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]

});


// Create the model

const User = mongoose.model ("user",userSchema)

// Export the model

module.exports = User