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
}

const video_controller = new VideoController()
module.exports = video_controller