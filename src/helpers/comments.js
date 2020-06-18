const { Comment, image } = require("../models");
module.exports = {
  async newest() {
    const comments = await Comment.find().limit(5).sort({ timestamp: -1 });
    for (const comment of comments) {
      const Image = await image.findOne({ _id: comment.image_id });
      comment.image = Image;
    }
    return comments;
  },
};
