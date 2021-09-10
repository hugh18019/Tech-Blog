const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData');
const seedUserPost = require('./UserPostData');

const seedAll = async () => {
  await sequelize.sync({ force: false });

  await seedUser();
  await seedPost();
  await seedComment();
  await seedUserPost();

  process.exit(0);
};

seedAll();
