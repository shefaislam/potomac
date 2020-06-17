const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const app = express()

const urlencodedParser = bodyParser.urlencoded({extended: false})

const uri = "mongodb+srv://shefa:potomac_Atlas_2020@potomac-ksdbt.mongodb.net/<dbname>?retryWrites=true&w=majority"
const client = new MongoClient(uri, {useNewUrlParser: true});

/*
client.connect((err) => {
    const connection = client.db("test").collection("names").insertOne({
        person: "Shefa"
    }, (err, result) => {
        if(err) {
            return console.log(err)
        }
        console.log(result.ops)
    })
})
*/

// Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'views')

// Express Setups
app.set('view engine', 'hbs')
app.set('views', viewsPath)


app.use(express.static(publicPath))

const getPosts = (callback) => {
    client.connect((err) => {
        client.db("test").collection("posts").find({}).toArray((err, posts) => {
            if(err) {
                callback('Error', undefined)
            } else {
                callback(undefined, posts)
            }
        })
    })
}


const createPost = (title, callback) => {
    client.connect((err) => {
        client.db("test").collection("posts").insertOne({
            title: title
        }, (err, result) => {
            if(err) {
                callback('Error adding posts', undefined)
            } else {
                callback(undefined, result)
            }
        })
    })
}


app.get('/', (req, res) => {

    // MAking MongoDB Request
    
    const posts = getPosts((err, posts) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                posts: posts
            })
        }
    })

    
})


app.post('/add_post', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)

    let title = req.body.title
    createPost(title, (err, result) => {
        if(err) {
            return console.log(err)
        } else {
            res.redirect('/')
        }
    })
})




app.listen(3005, () => {
    console.log('Press Ctrl + C to exit.')
})