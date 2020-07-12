const express = require ('express')
const router = express.Router()

const Post = require('../models/Post')


// @route       POST /posts
// @desc        Create a new post
router.post('/', async(req, res) => {
    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201)
        res.redirect('/create')
    } catch (e) {
        res.status(400)
        res.send(e)
    }
})


// @route       GET /posts
// @desc        Get all Posts
router.get('/', async(req, res) => {
    const posts = await Post.find({})
    res.json({posts})
})


// @route       GET /posts/delete/:postID
// @desc        Deletes a post by its ID
router.get('/delete/:postID', async(req, res) => {
    const postID = req.params.postID
    try {
        const post = await Post.findByIdAndDelete(postID)
        if(!post) {
            return res.status(404).send('Post Not Found')
        }
        res.redirect('/users/home')
    } catch (e) {
        console.log(e)
        res.redirect('/users/home')
    }
})



// @route       POST /posts/comment
// @desc        Create a comment
router.post('/comment/:postID',async(req,res)=>{

    const { owner, text } = req.body

    const comment = {owner, text}

    try {
        const post = await Post.findOne({_id: req.params.postID})
        if(!post) {
            return res.status(404).json({ msg: 'Post not found!' })
        }
        post.comments.unshift(comment)
        await post.save()
        res.send(post)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})


module.exports = router