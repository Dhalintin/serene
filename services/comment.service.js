const Message = require('../models/messages.model');
const Comment = require('../models/comment.model');

class CommentService {
    async getPost(id) {
        const post = await Message.findById(id);
        return post;
    }

    async addComment(postId, userId, comment) {
        const newComment = await Comment.create({ postId, userId, comment });
        return newComment;
    }

    async getComments(postId) {
        const comments = await Comment.find({ postId }).populate('userId', '-walletid -type-category -createdAt -updatedAt -_v').exec();
        return comments;
    }

    async getAComment(id) {
        const comment = await Comment.findById(id);
        return comment;
    }

    async updateComment(id, comment) {
        const updatedComment = await Comment.findByIdAndUpdate({ _id: id }, { comment }, { new: true });
        return updatedComment;
    }

    async deleteComment(id) {
        const updatedComment = await Comment.findByIdAndDelete(id);
        return updatedComment;
    }
}

const comment = new CommentService();
module.exports = comment;
