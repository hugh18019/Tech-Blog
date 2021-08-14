const User = require('./User');
const Post = require('./Post');
const UserPost = require('./UserPost');

User.belongsToMany(Post, {
  through: UserPost,
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsToMany(User, {
  through: UserPost,
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

User.hasMany(UserPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.hasMany(UserPost, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Post, UserPost };
