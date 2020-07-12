const mongoose = require('mongoose')
const config = require('config')

mongoose.connect("mongodb+srv://shefa:potomac_Atlas_2020@potomac-ksdbt.mongodb.net/potomac-api?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true
})