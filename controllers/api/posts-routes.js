const router = require('express').Router();
const { Post, User, UserPost } = require('../../models');
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    // console.log('postData', postData);

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log('posts', posts);

    res.render('home', { posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
