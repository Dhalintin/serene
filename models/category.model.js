const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        trim: true
    }, 
    desc: {
        type: String,
        required: [true, "{PATH} is required"], 
        trim: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category