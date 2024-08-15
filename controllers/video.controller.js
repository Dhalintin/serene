const category_service = require('../services/category.service')
const video_service = require('../services/video.service')
const handleValidationError = require('../utils/validation-error.util')

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
        const {title, link, desc, cat_id} = req.body

        try {
            const cat_id_exists = category_service.get_category(cat_id)
            if(!cat_id_exists){
                return res.status(404).json({
                    status: false,
                    message: `Category with such ID: ${cat_id} is not found`
                })
            }
            const video = await video_service.create_video(title, link, desc, cat_id)
            res.status(201).json({
                status: true,
                data: video,
                message: 'Video Created Successfully...'
            })
        } catch (error) {
            if(error.name === "ValidationError"){
               if (handleValidationError(res, error, 'title')) return;
               if (handleValidationError(res, error, 'link')) return;
               if (handleValidationError(res, error, 'desc')) return
               if (handleValidationError(res, error, 'cat_id')) return
            }
            console.log(error)
            return res.status(500).json({
                status: false,
                message: 'Error creating Video',
                error: error.message,
                name: error.name
            })
        }
    }

    async  update_video(req, res) {
        const { id } = req.params;
        const { title, link, desc, cat_id } = req.body;

        const video_id_exists = await video_service.get_a_video(id)
        if(!video_id_exists){
            return res.status(404).json({
                status: false,
                message: `Video with such ID: ${id} is not found`
            })
        }
        
        // Only include fields that are provided
        const data = {};
        if (title !== undefined) data.title = title;
        if (link !== undefined) data.link = link;
        if (desc !== undefined) data.desc = desc; 
        if (cat_id !== undefined) data.cat_id = cat_id; 
    
        // Check if there's any data to update
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
            status: false,
            message: 'No data provided for update'
            });
        }
    
        try {
            const update_video = await video_service.update_video(id, data);
            
            if (update_video) {
            return res.status(200).json({
                status: true,
                message: 'Video updated successfully',
                data: update_video
            });
            } else {
            return res.status(404).json({
                status: false,
                message: 'Category not found'
            });
            }
        } catch (error) {
            // console.error(error);  
            if (error.name === "CastError") {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid Id format'
                });
            }
            return res.status(500).json({
            status: false,
            message: 'An error occurred while updating the category'
            });
        }
    }

    
    async delete_video(req, res) {
        const { id } = req.params
        const video_id_exists = await video_service.get_a_video(id)
        
         if (!video_id_exists) {
             return res.status(404).json({
                 status: false,
                 message: `Video with such ID: ${id} does not exist`
             });
         }
        try {
           
            const delete_video = await video_service.delete_video(id);
            if (delete_video) { 
                return res.status(200).json({
                    status: false,
                    message: 'Video deleted successfully'
                })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: 'An error occurred while deleting the category'
            })
        }
    }
}

const video_controller = new VideoController()
module.exports = video_controller