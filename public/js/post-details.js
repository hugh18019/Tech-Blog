var showCommentAreaBtn = document.querySelector('#new-comment-btn');
var newCommentArea = document.querySelector('#new-comment');
var newCommmentContentEl = document.querySelector('#new-comment-content');

console.log('showCommentAreaBtn', showCommentAreaBtn);
console.log('newCommentArea', newCommentArea);
console.log('newCommmentContentEl', newCommmentContentEl);

// Functions for comments
function handleShowCommentArea() {
  console.log('got here');

  newCommentArea.hidden = true;
  // if (newCommentArea.hidden === false) {
  //   newCommentArea.hidden = true;
  //   console.log(newCommentArea.hidden);
  // } else {
  //   newCommentArea.hidden = false;
  //   console.log(newCommentArea.hidden);
  // }
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
showCommentAreaBtn.addEventListener('click', handleShowCommentArea);
newCommentArea.addEventListener('submit', handleCommentSubmit);
