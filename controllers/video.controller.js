const video_service = require('../services/video.service')

class VideoController{

    async get_a_video(req, res){

        const {id} = req.params

        try {
            const video = await video_service.get_a_video(id)
            if(!video){
                return res.status(404).json({
                    status: false,
                    message: 'Video not found'
                })
            }
            if(video.length === 0){
                return res.status(404).json({
                    status: false,
                    message: 'Video not found'
                })
            }
            res.status(200).json({
                status: true,
                data: video
            })
        } catch (error) {
            
                if(error.name === "CastError"){
                    return res.status(400).json({
                        status: false,
                        message: 'Invalid video id'
                    })
                }
                return res.status(500).json({
                    status: false,
                    message: 'Error getting Video',
                    error: error.message,
                    name: error.name
                });
        }
    }

    // function to get all the videos
    async get_all_videos(req, res){
        // all your code goes here
        try {
            const videos = await video_service.get_all_videos()
            if(!videos){
                return res.status(404).json({
                    status: false,
                    message: 'Videos not found'
                })
            }
            if(videos.length === 0){
                return res.status(404).json({
                    status: false,
                    message: 'Videos not found'
                })
            }
            res.status(200).json({
                status: true,
                data: videos
            })
        }catch(errors){
            console.log(errors)
            return res.status(500).json({
                status: false,
                message: 'Error getting Videos',
                error: errors.message,
                name: errors.name
            });
        }
    }

    async create_video(req, res){
        // all your code goes here
    }
}

const video_controller = new VideoController()
module.exports = video_controller