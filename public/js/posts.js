var showPostAreaBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');
var newTitleEl = document.querySelector('#new-post-title');
var newPostContentEl = document.querySelector('#new-post-content');

var showCommentAreaBtn = document.querySelector('.new-comment-btn');
var newCommentArea = document.getElementsByClassName('comment-section');
var newCommmentContentEl = document.querySelector('.new-comment-content');

// console.log(newTitle);
// console.log(newPostContent);

// var dateTime = new Date().toLocaleString();

function handleShowPostArea() {
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
function handleShowCommentArea(newCommentArea) {
  console.log('got here');
  if (newCommentArea.hidden === false) {
    newCommentArea.hidden = true;
  } else {
    newCommentArea.hidden = false;
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
// newCommentArea.addEventListener('submit', handleCommentSubmit);

// console.log(newCommentArea);

for (var each of newCommentArea) {
  console.log(each.firstElementChild);
  each.firstElementChild.addEventListener(
    'click',
    handleShowCommentArea(each.lastElementChild)
  );
  console.log(each.lastElementChild);
  each.lastElementChild.addEventListener('submit', handleCommentSubmit);
}
