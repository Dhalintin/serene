const CommentService = require('../services/comment.service');

class ChatController {
    async getComments(req, res) {
        const postId = req.params.id;

        try {
            const existingPost = await CommentService.getPost(postId);

            if (!existingPost) {
                return res.status(401).json({
                    success: false,
                    message: 'Post does not exist!'
                });
            }

            const comments = await CommentService.getComments(postId);

            return res.status(200).json({
                success: true,
                message: 'Success!',
                data: comments
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async postComment(req, res) {
        const postId = req.params.id;

        try {
            const { userId, comment } = req.body;
            const existingPost = await CommentService.getPost(postId);

            if (!existingPost) {
                return res.status(401).json({
                    success: false,
                    message: 'Post does not exist!'
                });
            }

            const newComment = await CommentService.addComment(postId, userId, comment);

            return res.status(200).json({
                success: true,
                message: 'Success!',
                data: newComment
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async getComment(req, res) {
        const id = req.params.id;

        try {
            const comment = await CommentService.getAComment(id);

            return res.status(200).json({
                success: true,
                message: 'Success!',
                data: comment
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async editComment(req, res) {
        const commentid = req.params.id;

        try {
            const comment = req.body.comment;
            const updatedcomment = await CommentService.updateComment(commentid, comment);

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: updatedcomment
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteComment(req, res) {
        const commentid = req.params.id;

        try {
            const updatedcomment = await CommentService.deleteComment(commentid);

            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: updatedcomment
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new ChatController();
