const Video = require('../models/vidoe.model');

class VideoService {
    async get_a_video(video_id) {
        const video = await Video.findById(video_id);
        return video;
    }

    async get_all_videos() {
        const videos = await Video.find();
        return videos;
    }

    async create_video(title, link, desc, cat_id) {
        const video = new Video({ title, link, desc, cat_id });
        return await video.save();
    }

    async update_video(video_id, updates) {
        const updateObject = {};

        if (updates.title !== undefined) {
            updateObject.title = updates.title;
        }

        if (updates.link !== undefined) {
            updateObject.link = updates.link;
        }

        if (updates.desc !== undefined) {
            updateObject.desc = updates.desc;
        }
        if (updates.cat_id !== undefined) {
            updateObject.cat_id = updates.cat_id;
        }

        const updated_video = await Video.findByIdAndUpdate(video_id, { $set: updateObject }, { new: true });

        return updated_video !== null;
    }

    async delete_video(video_id) {
        return await Video.findByIdAndDelete(video_id);
    }
}

const video_service = new VideoService();
module.exports = video_service;
