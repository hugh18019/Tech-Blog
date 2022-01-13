const router = require('express').Router();

const usersRoutes = require('./users-routes');
const postsRoutes = require('./posts-routes');
const commentRoutes = require('./comments-routes');
const postDetailRoutes = require('./post-details-routes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/post-details', postDetailRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
