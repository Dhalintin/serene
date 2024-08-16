const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "{PATH} is required"],
        trim: true
    },
    body: {
        type: String,
        required: [true, "{PATH} is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "{PATH} is required"],
        trim: true
    },
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "{PATH} is required"]
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article;  //export the model