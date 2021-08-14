var createPostBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');
var newTitleEl = document.querySelector('#new-post-title');
var newPostContentEl = document.querySelector('#new-post-content');

var createCommentBtn = document.querySelector('#new-comment-btn');
var newCommentArea = document.querySelector('#new-comment');
var newCommmentContentEl = document.querySelector('#new-comment-content');

// console.log(newTitle);
// console.log(newPostContent);

// var dateTime = new Date().toLocaleString();

function handleCreatePostBtn() {
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
}

function handleCreateComment() {
  console.log('got here');
  if (newCommentArea.hidden === false) {
    newCommentArea.hidden = true;
  } else {
    newCommentArea.hidden = false;
  }
}

createPostBtn.addEventListener('click', handleCreatePostBtn);

document.addEventListener('mouseup', function (e) {
  if (!newPostArea.contains(e.target) && !createPostBtn.contains(e.target)) {
    newPostArea.hidden = true;
  }
});

newPostArea.addEventListener('submit', handlePostSubmit);

createCommentBtn.addEventListener('click', handleCreateComment);
// newCommentArea.addEventListener('submit', handle);
