const express = require('express')
const router = express.Router()

const video_controller = require('../controllers/video.controller')

router.route('/:id')
    .get(video_controller.get_a_video)

module.exports = router