const mongoose = require('mongoose')

const uri = "mongodb+srv://shefa:potomac_Atlas_2020@potomac-ksdbt.mongodb.net/potomac-api?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true
})