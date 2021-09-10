const Comment = require('../models/Comment');
const sequelize = require('sequelize');

const commentdata = [
  {
    comment_content: 'dummy text1',
    post_id: 1,
  },
  {
    comment_content: 'dummy text2',
    post_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
