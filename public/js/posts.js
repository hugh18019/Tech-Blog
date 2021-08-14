var newPostBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');
var newTitleEl = document.querySelector('#new-post-title');
var newPostContentEl = document.querySelector('#new-post-content');

// console.log(newTitle);
// console.log(newPostContent);

var dateTime = new Date().toLocaleString();

function handleNewPostBtn() {
  if (newPostArea.hidden === false) {
    newPostArea.hidden = true;
    console.log(newPostArea.hidden);
  } else {
    newPostArea.hidden = false;
    console.log(newPostArea.hidden);
  }
}

newPostBtn.addEventListener('click', handleNewPostBtn);

document.addEventListener('mouseup', function (e) {
  if (!newPostArea.contains(e.target) && !newPostBtn.contains(e.target)) {
    newPostArea.hidden = true;
  }
});

async function handleFormSubmit(event) {
  event.preventDefault();

  var newTitle = newTitleEl.value.trim();
  var newPostContent = newPostContentEl.value.trim();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: `${newTitle}`,
      content: `${newPostContent}`,
      user_id: 1,
      date_posted: `${dateTime}`,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log('Successfully posted');
  } else {
    console.log('Failed to post');
  }
}

newPostArea.addEventListener('submit', handleFormSubmit);
