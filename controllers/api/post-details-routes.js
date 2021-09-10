const router = require('express').Router();

router.get('/', async (req, res) => {
  console.log('Hit post-details-routes');
  res.render('posts');
});

module.exports = router;
