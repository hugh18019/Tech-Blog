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
var newCommmentContentEl = $('.new-comment-content');
var newCommentForm = $('.new-comment-form');

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
document.addEventListener('mouseup', function (e) {
  if (!newPostArea.contains(e.target) && !showPostAreaBtn.contains(e.target)) {
    newPostArea.hidden = true;
  }
});
newPostArea.addEventListener('submit', handlePostSubmit);

// Functions for comments
function handleShowCommentArea(e) {
  // console.log('got here');
  // console.log('newCommentForm', newCommentForm);

  // console.log('e.target', e.target);

  // console.log($(e.target).siblings(0));

  // $(e.target).siblings(0)[0].hidden = false;

  if ($(e.target).siblings(0)[0].hidden === false) {
    $(e.target).siblings(0)[0].hidden = true;
  } else {
    $(e.target).siblings(0)[0].hidden = false;
  }
}

async function handleCommentSubmit(event) {
  event.preventDefault();
  var newCommentContent = newCommmentContentEl.value.trim();
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

postsContainer.on('click', '.new-comment-btn', handleShowCommentArea);
