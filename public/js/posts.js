var showPostAreaBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');
var newTitleEl = document.querySelector('#new-post-title');
var newPostContentEl = document.querySelector('#new-post-content');

var postsContainer = $('.posts-container');

// var showCommentAreaBtn = document.querySelector('.new-comment-btn');
// var newCommentSection = document.querySelectorAll('.comment-section');
// var newCommmentContentEl = document.querySelector('.new-comment-content');
// var newCommentForm = document.querySelector('.new-comment-form');

var showCommentAreaBtn = $('.new-comment-btn');
var newCommentSection = $('.comment-section');
var newCommentContentEl = $('.new-comment-content');
var newCommentForm = $('.new-comment-form');
var getCommentBtn = $('.get-comment-btn');

// console.log(newTitle);
// console.log(newPostContent);
// console.log('newCommentArea', newCommentArea);

// var dateTime = new Date().toLocaleString();

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
});

// Hide the new comment form when the user clicks outside of it
$(document).mouseup(function (e) {
  console.log('got here');
  if (
    !newCommentForm.is(e.target) &&
    newCommentForm.has(e.target).length === 0
  ) {
    newCommentForm[0].hidden = true;
  }
});

newPostArea.addEventListener('submit', handlePostSubmit);

// Functions for comments
function handleShowCommentArea(e) {
  if ($(e.target).siblings(0)[0].hidden === false) {
    $(e.target).siblings(0)[0].hidden = true;
  } else {
    $(e.target).siblings(0)[0].hidden = false;
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

// Event listeners for comments
// showCommentAreaBtn.addEventListener('click', handleShowCommentArea);
// newCommentForm.addEventListener('submit', handleCommentSubmit);

// console.log('newCommentArea', newCommentArea);

// for (var each of newCommentSection) {
//   console.log('each.lastElementChild', each.lastElementChild);
//   each.firstElementChild.addEventListener(
//     'click',
//     handleShowCommentArea(each.lastElementChild)
//   );
//   console.log(each.lastElementChild);
//   each.lastElementChild.addEventListener('submit', handleCommentSubmit);
// }

// postsContainer.addEventListener('click', (event) => {
//   if (event.target.className === 'new-comment-btn') {
//     // handleShowCommentArea();
//     console.log(event.target.parent);
//   }
// });

async function handleGetComments(e) {
  const postId = $(e.target).parent()[0].id;

  const response = await fetch('comments/:postId', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('Successfully retrieved comments');
  } else {
    console.log('Failed to retrieve comments');
  }
}

postsContainer.on('click', '.new-comment-btn', handleShowCommentArea);
postsContainer.on('click', '.submit-comment-btn', handleCommentSubmit);
postsContainer.on('click', '.get-comment-btn', handleGetComments);
