const Video = require('../models/vidoe.model')

class VideoService{

    async get_a_video(video_id){

        const video_id = await Video.findById(video_id)
        return video_id
    } 
}