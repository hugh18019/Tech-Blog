const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    // console.log( 'hit /posts');
    // console.log( req.session );

    if ( req.session.logged_in ) {

            const postData = await Post.findAll(
                { include: [{ model: Comment }] },
                { where: { user_id: req.session.user_id } }
            )

            const posts = postData.map((post) => post.get({ plain: true }));


            res.render( 'posts', {posts: posts});

    }
    else {
        res.render( 'login' );
    }

})

// router.put('/like', async (req, res) => {

//     try {
  
//       const postData = await Post.increment(
//         { likes: +1 },
//         { where: { id: req.body.postId } }
//       );
  
//       res.status(200).json(postData);
  
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   })
  
//   router.delete(':id', async (req, res) => {
//     try {
//       const postData = await Post.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });
  
//       res.status(200).json(postData);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });
  


module.exports = router;

