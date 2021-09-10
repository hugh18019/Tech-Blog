const Post = require('../models/Post');
const Sequelize = require('sequelize');

const postdata = [
  {
    title: 'post title1',
    content: 'post content1',
    date_posted: '2021-08-12 04:05:02',
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
