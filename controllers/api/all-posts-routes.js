const router = require('express').Router();
const { response } = require('express');
const { Post, User, UserPost, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {


    console.log( 'hit api/posts' );
    console.log( 'req', req.session.logged_in );

      const postData = await Post.findAll(
        { include: [{ model: Comment }] },
      );

      console.log('postData', postData);

      const posts = postData.map((post) => post.get({ plain: true }));


      // res.status(200).json(postData);

      res.render('allPosts', { posts: posts });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {

  // console.log('req.body', req.body);

  try {
    const postData = await Post.update({
      title: req.body.title, 
      content: req.body.content,
      date_posted: req.body.date_posted
    },
      { where: { id: req.params.id } }
    )

    // console.log( 'postData', postData );

    res.status(200).json(postData);
  }
  catch ( err ) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      date_posted: req.body.date_posted,
    });

    // const postId = postData.dataValues.id;

    res.status(200).json(postData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/like/:id', async (req, res) => {

  console.log( 'hit api/allPosts/like' );
  console.log('req.params', req.params );


  try {

    const postData = await Post.increment(
      { likes: +1 },
      { where: { id: req.params.id } }
    );

    console.log( 'postData', postData );

    res.status(200).json(postData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {

  console.log( 'req.params.id', req.params.id );

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
