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

// likeBtn.addEventListener('click', handleLikePost); 



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

async function handlePostSubmit(event) {
  event.preventDefault();

  var newTitle = newTitleEl.value.trim();
  var newPostContent = newPostContentEl.value.trim();

  console.log( 'newTitle', newTitle );
  console.log( "newPostContent", newPostContent );

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: `${newTitle}`,
      content: `${newPostContent}`,
      // Should user_id from req.session
      user_id: 1,
      date_posted: `${new Date().toLocaleString()}`,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log('Successfully posted');
  } else {
    console.log('Failed to post');
  }

  newTitleEl.value = '';
  newPostContentEl.value = '';
  handleShowPostArea();
}

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
});

// Hide the new comment form when the user clicks outside of it
// $(document).mouseup(function (e) {
//   if (
//     newCommentForm[0] && 
//     !newCommentForm.is(e.target) &&
//     newCommentForm.has(e.target).length === 0 &&
//     !addCommentBtn.is(e.target)
//   ) {
//     newCommentForm[0].hidden = true;
//   }
// });

seeCommentBtn.click(function (e) {
  console.log('got here');
  console.log( 'commentContainer.css("visibility")', commentContainer.css("visibility") );

  if (commentContainer.css("visibility") == "visible") {
    commentContainer.css("visibility", "hidden");
    commentContainer.hide();
  }
  else {
    commentContainer.css("visibility", "visible");
    commentContainer.show();
  }

})


newPostArea.addEventListener('submit', handlePostSubmit);

// Functions for comments
function handleShowAddCommentArea(e) {
  // console.log(
  //   '$(e.target).siblings(0)[0].hidden',
  //   $(e.target).siblings(0)[0].hidden
  // );

  console.log($(e.target).siblings().eq(0)[0].hidden);

  if ($(e.target).siblings().eq(0)[0].hidden === false) {
    // console.log('$(e.target).siblings(0)[0].hidden is currently false');

    $(e.target).siblings().eq(0)[0].hidden = true;
  } else {
    // console.log('$(e.target).siblings(0)[0].hidden is currently true');
    console.log('here');
    $(e.target).siblings().eq(0)[0].hidden = false;
  }
}

async function handleCommentSubmit(event) {
  event.preventDefault();

  // console.log(event.target);
  // console.log(
  //   $(event.target).parent().siblings().eq(0).children().eq(1)[0].value
  // );
  // console.log('newCommentContentEl', newCommentContentEl.value);

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
      post_id: 1,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('Successfully posted new comment');
  } else {
    console.log('Failed to posst new comment');
  }
}

// async function handleGetComments(e) {
//   const postId = $(e.target).parent()[0].id;

//   const response = await fetch('comments/:postId', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     console.log('Successfully retrieved comments');
//   } else {
//     console.log('Failed to retrieve comments');
//   }
// }

function handleSeeComments(e) {
  $(e.target).siblings().eq(2)[0].hidden = false;
}

postsContainer.on('click', '.new-comment-btn', handleShowAddCommentArea);
postsContainer.on('click', '.submit-comment-btn', handleCommentSubmit);
postsContainer.on('click', '.see-comment-btn', handleSeeComments);
