const Comment = require('../models/Comment');
const sequelize = require('sequelize');

const commentdata = [
  {
    comment_content: 'dummy text1',
    post_id: 1,
    user_id: 1,
    username: "user1"
  },
  {
    comment_content: 'dummy text2',
    post_id: 1,
    user_id: 2,
    username: "user2"
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
