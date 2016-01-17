var nestedComments = (function () {
  var id = 0;
  var comments = [];

  function init () {
    bindListener();
    render();
  }

  function bindListener () {
    var $postReply = document.getElementById('post-reply');
    $postReply.addEventListener('click', addComment);
  }

  function addComment (e) {
    var text = window.prompt('Enter your reply', '');
    var $parentElement = e.target.parentElement;
    if (text) {
      var comment = {
        id: id++,
        text: text
      };
      comment.parentId = $parentElement.id !== 'post'
        ? $parentElement.id
        : undefined;
      comments.push(comment);
    }
    render();
  }

  function render () {
    var initialMargin = '0px';
    var nestedMargin = '15px';
    var $commentList = document.getElementById('comment-list');
    $commentList.innerHTML = '';
    comments.map(function (comment) {
      if (comment.parentId) {
        var $parentComment = document.getElementById(comment.parentId);
        var $comment = createCommentElement(comment, nestedMargin);
        $parentComment.appendChild($comment);
      } else {
        $comment = createCommentElement(comment, initialMargin);
        $commentList.appendChild($comment);
      }
    });
  }

  function createCommentElement (comment, margin) {
    var $comment = document.createElement('div');
    $comment.id = comment.id;
    $comment.setAttribute('data-comment', true);
    $comment.style.marginLeft = margin;
    $comment.classList.add('comment-box');

    var $commentText = document.createElement('p');
    $commentText.innerHTML = comment.text;

    var $replyButton = document.createElement('span');
    $replyButton.classList.add('comment-box--reply');
    $replyButton.addEventListener('click', addComment);
    $replyButton.innerHTML = 'reply';

    $comment.appendChild($commentText);
    $comment.appendChild($replyButton);

    return $comment;
  }

  return {
    init: init
  };
})();

nestedComments.init();
