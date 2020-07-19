const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
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
    }],
})



const Post = mongoose.model('Post', postSchema)

module.exports = Post