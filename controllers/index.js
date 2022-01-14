const router = require('express').Router();

const homeRoutes = require('./home-routes');
const postsRoutes = require('./posts-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/posts', postsRoutes);
router.use('/api', apiRoutes);

module.exports = router;
