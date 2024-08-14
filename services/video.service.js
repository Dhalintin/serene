const Video = require('../models/vidoe.model')

class VideoService{

    async get_a_video(video_id){
        const video = await Video.findById(video_id)
        return video
    } 

    async get_all_videos(){
        const videos = await Video.find()
        return videos
    }

    async create_video(title, link, desc, cat_id){
        const video = new Video({title, link, desc, cat_id})
        return  await video.save()
    }
}

const video_service = new VideoService()
module.exports = video_service