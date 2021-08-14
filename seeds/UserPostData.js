const UserPost = require('../models/UserPost');

const userpostdata = [
  {
    user_id: 1,
    post_id: 1,
  },
];

const seedUserPost = () => UserPost.bulkCreate(userpostdata);

module.exports = seedUserPost;
