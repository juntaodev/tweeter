/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

(function () {
  $(document).ready(function () {
    // initial load function
    loadTweets();

    $("form").submit(submitTweet);
  });

  // Escape XSS attempts
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(data) {
    const tweet = $(`
    <div class="tweet-container">
      <div class="tweet-user">
        <div class="tweet-user-name">
          <img class="image" src=${data.user.avatars}></img>
          <p class="username">${data.user.name}</p>
        </div>
        <div class="tweet-user-id">
          <p>${data.user.handle}</p>
        </div>
      </div>
      <article class="tweet">${escape(data.content.text)}</article>
      <footer>
        <div>${timeago.format(data.created_at)}</div>
        <div class="small-icons">
          <a><i class="fa-solid fa-flag"></i></a>
          <a><i class="fa-solid fa-repeat"></i></a>
          <a><i class="fa-solid fa-heart"></i></a>
        </div>
      </footer>
    </div>
    `);
    return tweet;
  };

  // show tweets
  const renderTweets = function (tweets) {
    const $container = $("#tweets-container").empty();

    tweets.forEach((element) => {
      const $tweet = createTweetElement(element);
      $container.prepend($tweet[0]);
    });
  };

  // load tweets from server
  const loadTweets = function () {
    $.get("/tweets").then(function (data) {
      renderTweets(data);
    });
  };

  // this section dictates what to do after 'submit' has been pressed.
  const submitTweet = function (event) {
    event.preventDefault();
    // hides the error message when the 'submit' button is clicked
    $(".error-message").html(" ");
    $(".error-message").slideUp(0);

    const inputData = $(".input-bar").val();

    let isValid = true;

    if (!inputData) {
      $(".error-message").html(
        "<i class='fa-solid fa-circle-exclamation'></i> &emsp;Please input some text."
      );
      $(".error-message").slideDown(400);
      isValid = false;
    }

    if (inputData.length > 140) {
      $(".error-message").html(
        "<i class='fa-solid fa-circle-exclamation'></i> &emsp;Please stay under 140 characters."
      );
      $(".error-message").slideDown(400);
      isValid = false;
    }

    if (isValid) {
      // convert JSON data to query-text format
      const serializedData = $(this).serialize();

      // jQuery AJAX post request
      $.post("/tweets", serializedData).then(() => {
        loadTweets();
      });

      // reset text-box and counter
      $(".input-bar").val("").trigger("input");
    }
  };
})();