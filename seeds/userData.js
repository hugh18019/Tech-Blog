const sequelize = require('../config/connection');
const User = require('../models/User');

const userdata = [
  {
    username: 'user1',
    password: '12345',
  },
  {
    username: 'user2',
    password: '12345'
  }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
