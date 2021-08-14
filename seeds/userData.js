const sequelize = require('../config/connection');
const User = require('../models/User');

const userdata = [
  {
    username: 'user1',
    password: '12341234',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
