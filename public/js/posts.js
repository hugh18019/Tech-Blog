var newPostBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');

function handleNewPostBtn() {
  newPostArea.hidden = false;
}

newPostBtn.addEventListener('click', handleNewPostBtn);

document.addEventListener('mouseup', function (e) {
  if (!newPostArea.contains(e.target)) {
    newPostArea.hidden = true;
  }
});
