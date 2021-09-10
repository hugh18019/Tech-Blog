const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      post_id: req.params.id,
    });

    var comment = commentData.get({ plain: true });

    res.status(200).json(comment);
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
    });

    var comment = commentData.get({ plain: true });

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
