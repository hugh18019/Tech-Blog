const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('../models/User');

const userdata = [
  {
    name: 'tom',
    username: 'user1',
    password: '12341234',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
