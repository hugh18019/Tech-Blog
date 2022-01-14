var showPostAreaBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');
var newTitleEl = document.querySelector('#new-post-title');
var newPostContentEl = document.querySelector('#new-post-content');

var postsContainer = $('.posts-container');

// var addCommentBtn = document.querySelector('.new-comment-btn');
// var newCommentSection = document.querySelectorAll('.comment-section');
// var newCommmentContentEl = document.querySelector('.new-comment-content');
// var newCommentForm = document.querySelector('.new-comment-form');

var commentContainer = $('.comment-container');
var addCommentBtn = $('.add-comment-btn');
var newCommentSection = $('.create-comment-section');
var newCommentContentEl = $('.new-comment-content');
var newCommentForm = $('.new-comment-form');
var seeCommentBtn = $('.see-comment-btn');
var likeBtn = $('.like-btn');


//////////////////////////////////////////////////////////////////////////////// Event Listeners ////////////////////////////////////////////////////////////////////////
likeBtn.click(handleLike); 

// Event listeners for posts
showPostAreaBtn.addEventListener('click', handleShowPostArea);

// Hide the new post form when the user clicks outside of it
document.addEventListener('mouseup', function (e) {
  if (!newPostArea.contains(e.target) && !showPostAreaBtn.contains(e.target)) {
    newPostArea.hidden = true;
  }

  if (!commentContainer.is(e.target) && !seeCommentBtn.is(e.target)) {
    commentContainer.css("visibility", "hidden");
    commentContainer.hide()
  }

  if (!newCommentForm.is(e.target) && !addCommentBtn.is(e.target)
        && !newCommentForm.has(e.target).length) {
    newCommentForm.css("visibility", "hidden");
    newCommentForm.hide();
  }
});


// seeCommentBtn.click(function (e) {
//   console.log('got here');
//   console.log( 'commentContainer.css("visibility")', commentContainer.css("visibility") );

//   // console.log( 'commentContainer.text()', $(commentContainer).text());

//   if (commentContainer.css("visibility") == "visible") {
//     commentContainer.css("visibility", "hidden");
//     commentContainer.hide();
//   }
//   else {
//     commentContainer.css("visibility", "visible");
//     commentContainer.show();
//   }

// })


newPostArea.addEventListener('submit', handlePostSubmit);

function handleShowPostArea() {
  // console.log('got here');

  if (newPostArea.hidden === false) {
    newPostArea.hidden = true;
    console.log(newPostArea.hidden);
  } else {
    newPostArea.hidden = false;
    console.log(newPostArea.hidden);
  }
}

postsContainer.on('click', '.add-comment-btn', handleShowAddCommentArea);
postsContainer.on('click', '.submit-comment-btn', handleCommentSubmit);
postsContainer.on('click', '.see-comment-btn', handleSeeComments);
// postsContainer.on('click', 'add-comment-btn', hand)



////////////////////////////////////////////////////////////////////////////////////////// Handlers ////////////////////////////////////////////////////////////

async function handlePostSubmit(event) {
  event.preventDefault();

  var newTitle = newTitleEl.value.trim();
  var newPostContent = newPostContentEl.value.trim();

  const response = await fetch('/api/allPosts', {
    method: 'POST',
    body: JSON.stringify({
      title: `${newTitle}`,
      content: `${newPostContent}`,
      // Should get user_id from req.session
      user_id: 1,
      date_posted: `${new Date().toLocaleString()}`,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json();

  const postId = data.id;

  if (response.ok) {
    console.log('Successfully posted');
    document.location.replace('/posts');
  } else {
    console.log('Failed to post');
  }

  newTitleEl.value = '';
  newPostContentEl.value = '';
  handleShowPostArea();
}



// Functions for comments
function handleShowAddCommentArea(e) {


  console.log($(e.target).siblings().eq(0)[0].hidden);

  const newCommentForm = $(e.target).siblings().eq(0)[0];


  if ($(newCommentForm).css("visibility") == "visible") {
    // console.log('$(e.target).siblings(0)[0].hidden is currently false');

    $(newCommentForm).css("visibility", "hidden");
    $(newCommentForm).hide();

  } else {
    // console.log('$(e.target).siblings(0)[0].hidden is currently true');
    console.log('here');
    $(newCommentForm).css("visibility", "visible");
    $(newCommentForm).show();
  }
}

async function handleCommentSubmit(event) {
  event.preventDefault();

  const postId = $(event.target).parent().parent()[0].attributes.index.value;


  var newCommentContent = $(event.target)
    .parent()
    .siblings()
    .eq(0)
    .children()
    .eq(1)[0]
    .value.trim();

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({
      comment_content: `${newCommentContent}`,
      //should use req.session.post_id
      post_id: postId,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('Successfully posted new comment');
    document.location.replace('/posts');
  } else {
    console.log('Failed to posst new comment');
  }
}

function handleSeeComments(e) {
  // $(e.target).siblings().eq(2)[0].hidden = false;

  console.log( '$(e.target).siblings().eq(2)[0]', $(e.target).siblings().eq(2)[0] );

  var commentContainer = $(e.target).siblings().eq(2)[0];

  console.log('got here');
  console.log( 'commentContainer.css("visibility")', $(commentContainer).css("visibility") );

  if ($(commentContainer).css("visibility") == "visible") {
    $(commentContainer).css("visibility", "hidden");
    $(commentContainer).hide();
  }
  else {
    $(commentContainer).css("visibility", "visible");
    $(commentContainer).show();
  }
}


async function handleLike(e) {
  console.log( "e.target", e.target );

  // The id of the post to like is in the post's html index
  const postId = $(e.target).parent()[0].attributes.index.value;

  console.log('postId', postId);

  const response = await fetch('/api/allPosts/like', {
    method: 'PUT',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json();

  console.log('data', data);

  console.log( "data[0][1]", data[0][1] );

  // console.log( "e.target.value",$(e.target).text() );

  // $(e.target).html( "likes:" + `${data[0][1]}` );


  if (response.ok) {
    console.log( 'Successfully liked the post' );
    document.location.replace('/posts');
  }
  else {
    console.log( 'Failed to post' );
  }


}