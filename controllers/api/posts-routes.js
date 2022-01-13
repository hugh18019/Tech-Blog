const router = require('express').Router();
const { Post, User, UserPost, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }],
    });

    console.log('postData', postData);

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('posts', { posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
      date_posted: req.body.date_posted,
    });

    // const postId = postData.dataValues.id;

    res.status(200).json(postData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/like', async (req, res) => {

  console.log( 'req.body', req.body );

  try {

    const postData = await Post.increment(
      { likes: +1 },
      { where: { id: req.body.postId } }
    );

    console.log( 'postData', postData );

    res.status(200).json(postData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete(':id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
