const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./db/mongoose')
const Post = require('./models/post')

const app = express()

const urlencodedParser = bodyParser.urlencoded({extended: false})


// Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'views')

// Express Setups
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.json())

app.use(express.static(publicPath))


app.post('/posts', urlencodedParser, async(req, res) => {
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

app.get('/create', async(req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        postForPage: posts
    })
})


app.get('/delete/:postID', async(req, res) => {
    const postID = req.params.postID
    try {
        const post = await Post.findByIdAndDelete(postID)
        if(!post) {
            return res.status(404).send('Post Not Found')
        }
        res.redirect('/create')
    } catch (e) {
        console.log(e)
        res.redirect('/create')
    }
})


app.listen(3005, () => {
    console.log('Press Ctrl + C to exit.')
})