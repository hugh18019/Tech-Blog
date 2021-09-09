var showCommentAreaBtn = document.querySelector('#new-comment-btn');
var newCommentArea = document.querySelector('#new-comment');
var newCommmentContentEl = document.querySelector('#new-comment-content');

// Functions for comments
function handleShowCommentArea() {
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
showCommentAreaBtn.addEventListener('click', handleShowCommentArea);
newCommentArea.addEventListener('submit', handleCommentSubmit);
