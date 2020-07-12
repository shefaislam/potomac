const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comments: [{
        owner: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
            trim: true
        }
    }]
})



const Post = mongoose.model('Post', postSchema)

module.exports = Post