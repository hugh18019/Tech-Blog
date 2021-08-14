var newPostBtn = document.querySelector('#new-post-btn');
var newPostArea = document.querySelector('#new-post');

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
