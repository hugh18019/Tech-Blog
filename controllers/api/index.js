const router = require('express').Router();

const postsRoutes = require('./posts-routes');
const commentRoutes = require('./comments-routes');

router.use('/posts', postsRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
