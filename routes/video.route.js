const express = require('express')
const router = express.Router()

const video_controller = require('../controllers/video.controller')

router.route('/:id')
    .get(video_controller.get_a_video)
    .patch(video_controller.update_video)
    .delete(video_controller.delete_video)
router.route('/')
    .get(video_controller.get_all_videos)
    .post(video_controller.create_video)

module.exports = router