exports.deleteComment = function () {
    parentComment.removeChild(this.closest('.media'));
}