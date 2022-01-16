const User = require('./User');
const Post = require('./Post');
// const UserPost = require('./UserPost');
const Comment = require('./Comment');

// User.belongsToMany(Post, {
//   through: UserPost,
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Post.belongsToMany(User, {
//   through: UserPost,
//   foreignKey: 'post_id',
//   onDelete: 'CASCADE',
// });

// User.hasMany(UserPost, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Post.hasMany(UserPost, {
//   foreignKey: 'post_id',
//   onDelete: 'CASCADE',
// });

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'Cascade',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'Cascade',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'Cascade',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'Cascade'
})

module.exports = { User, Post, Comment };
