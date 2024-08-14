const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is Required"],
        trim: true
    },
    link: {
        type: String,
        required: [true, "{PATH} is Required"],
        trim: true
    },
    desc: {
        type: String,
        required: [true, "{PATH} is Required"],
        trim: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "{PATH} is Required"] 
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Video = mongoose.model("Video", videoSchema)
module.exports = Video;  //export the model