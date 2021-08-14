const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');
const seedUserPost = require('./UserPostData');

const seedAll = async () => {
  await sequelize.sync({ force: false });

  await seedUser();
  await seedPost();
  await seedUserPost();

  process.exit(0);
};

seedAll();
