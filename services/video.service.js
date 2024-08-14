const Video = require('../models/vidoe.model')

class VideoService{

    async get_a_video(video_id){

        const video = await Video.findById(video_id)
        return video
    } 
}

const video_service = new VideoService()
module.exports = video_service