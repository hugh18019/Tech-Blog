const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log('Arrived at comments routes');
  console.log('req.body', req.body);

  try {
    const commentData = await Comment.create({
      comment_content: req.body.comment_content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
      username: req.session.username
    });

    var comment = commentData.get({ plain: true });

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
