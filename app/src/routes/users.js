const express = require('express')
const router = express.Router()

// Import User model
const User = require('../models/User')

const Post=  require('../models/Post')

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

// @route       GET /users/home
//@desc         This will render home page
// router.get("/home",(req,res) => {
//     res.render("home")
// })

// @router      POST /users/register
// @desc        This registers a user
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.redirect('/users/login')
    } catch (err) {
        res.status(400).send('Invalid Data')
    }
})

// @router      POST /users/login
// @desc        This will login an user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email, password: req.body.password})
        if(!user) {
           return res.status(401).json(error.message) 
        }
        // Redirecting to a new router
        const posts = await Post.find({})
        res.render('home', { posts: posts })
    } catch (error) {
        res.status(401).send('Authorization Failed!')
    }
})

// @router         POST /user/home
// @desc           This will take user to home page
router.post("/home", async (req,res) => {
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