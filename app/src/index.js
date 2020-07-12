const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./db/mongoose')
const Post = require('./models/Post')

const app = express()

const urlencodedParser = bodyParser.urlencoded({extended: false})


// Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'views')

// Express Setups
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }))
app.use(express.static(publicPath))



// Routers
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))




app.listen(3005, () => {
    console.log('Press Ctrl + C to exit.')
})