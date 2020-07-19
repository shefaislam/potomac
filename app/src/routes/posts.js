const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const User = require('../models/User')


// @route       POST /posts
// @desc        Create a new post
router.post('/', async(req, res) => {

    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201)
        res.redirect(`/users/home/${req.body.user}`)
    } catch (e) {
        res.status(400)
        res.send(e)
    }
})


// @route       GET /posts
// @desc        Get all Posts
router.get('/', async(req, res) => {
    const posts = await Post.find({})
    res.json({ posts })
})


// @route       GET /posts/:userID/:postID
// @desc        Get post by ID
router.get('/:userID/:postID', async(req, res) => {
    const { userID, postID } = req.params

    try {
        const post = await Post.findById(postID)
        const user = await User.findById(userID)
        if (!post || !user) {
            console.log('Post not found!')
            return res.redirect(`/users/home/${userID}`)
        }
        res.render('post', { post, userID, user })
    } catch (err) {
        console.log('Server Error')
        return res.redirect(`/users/home/${userID}`)
    }
})



// @route       GET /posts/delete/:postID
// @desc        Deletes a post by its ID
router.get('/delete/:user_id/:postID', async(req, res) => {
    const postID = req.params.postID
    try {
        const post = await Post.findByIdAndDelete(postID)
        if (!post) {
            return res.status(404).send('Post Not Found')
        }
        res.redirect(`/users/home/${req.params.user_id}`)
    } catch (e) {
        console.log(e)
        res.redirect(`/users/home/${req.params.user_id}`)
    }
})






// @route       POST /posts/comment
// @desc        Create a comment
router.post('/comment/:userID/:postID/:view', async(req, res) => {

    const { owner, text } = req.body

    const comment = { owner, text }

    try {
        const post = await Post.findOne({ _id: req.params.postID })
        if (!post) {
            if (req.params.view === 'home') {
                return res.redirect(`/users/home/${req.params.userID}`)
            } else {
                return res.redirect(`/posts/${req.params.userID}/${req.params.postID}`)
            }
        }
        post.comments.unshift(comment)
        await post.save()
        if (req.params.view === 'home') {
            return res.redirect(`/users/home/${req.params.userID}`)
        } else {
            return res.redirect(`/posts/${req.params.userID}/${req.params.postID}`)
        }
    } catch (err) {
        console.log(err)
        if (req.params.view === 'home') {
            return res.redirect(`/users/home/${req.params.userID}`)
        } else {
            return res.redirect(`/posts/${req.params.userID}/${req.params.postID}`)
        }
    }
})







module.exports = router