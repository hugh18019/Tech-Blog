const postsContainer = $('#posts-container');
const commentContainer = $(".comment-container");
const seeCommentsBtn = $('.see-comments-btn');

postsContainer.on('click', '.see-comments-btn', handleSeeComments);

document.addEventListener('mouseup', function(e) {

    if (!commentContainer.is(e.target) && !seeCommentsBtn.is(e.target)) {
        commentContainer.css('visibility', 'hidden');
        commentContainer.hide();
    }

});

function handleSeeComments (event) {

    var seeCommentsBtn = event.target;
    // var commentsContainer = seeCommentsBtn.siblings().eq(2)[0];

    console.log( $(seeCommentsBtn).siblings().eq(1)[0] );

    var commentsContainer = $(seeCommentsBtn).siblings().eq(1)[0];

    if ($(commentsContainer).css('visibility') == 'visible') {
        $(commentsContainer).css('visibility', 'hidden');
        $(commentsContainer).hide();
    }
    else {
        $(commentsContainer).css('visibility', 'visible');
        $(commentsContainer).show();
    }
}