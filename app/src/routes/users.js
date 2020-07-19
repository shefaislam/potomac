const express = require('express')
const router = express.Router()

// Import User model
const User = require('../models/User')

const Post = require('../models/Post')

// @route       GET /users/register
// @desc        This will render the register page
router.get('/register', (req, res) => {
    res.render('register')
})

// @route       GET /users/login
// @desc        This will render login page
router.get("/login", (req, res) => {
    res.render("login")
})

// @route       GET /users/home/:id
// @desc         This will render home page
router.get("/home/:id", async(req, res) => {
    const user_id = req.params.id
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            return res.redirect('/users/login')
        }
        const allPosts = await Post.find({}).sort({ date: -1 })
        const userPosts = await Post.find({ user: user._id }).sort({ date: -1 })
            // console.log(allPosts)
        res.render('home', { allPosts, user, userPosts })
    } catch (err) {
        console.log(err)
        res.redirect('/users/login')
    }
})

// @router      POST /users/register
// @desc        This registers a user
router.post('/register', async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.redirect('/')
    } catch (err) {
        res.redirect('/')
    }
})

// @router      POST /users/login
// @desc        This will login an user
router.post('/login', async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        if (!user) {
            console.log('Authentication failed!')
            return res.redirect('/')
        }
        req.user = user._id
        res.redirect(`/users/home/${req.user}`)
    } catch (error) {
        console.log(error.message)
        res.redirect('/')
    }
})

// @router         POST /user/home
// @desc           This will take user to home page
router.post("/home", async(req, res) => {
    const user = new user(req.body)
    try {
        await post.save()
        res.status(202)
        res.redirect('/home')
    } catch (e) {
        res.status(500)
        res.send(e)
    }
})


// @route       POST /users/home
// @desc        Login


module.exports = router