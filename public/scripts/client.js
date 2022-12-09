/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(data) {
    console.log(data.content.text);
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
      <article class="tweet">${escape(tweetData.content.text)}</article>
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

  // show tweets in front page
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // get return value and append it to tweets container
    tweets.forEach(element => {
      const $tweet = createTweetElement(element);
      $("#tweets-container").prepend($tweet[0]);
    });
  };

  // load tweets from server
  const loadTweets = function() {
    // sends loaded data to renderTweets using AJAX
    $.ajax("/tweets", { method: "GET" }).then(function(data) {
      renderTweets(data);
    });
  };



  // initial load function
  loadTweets();

  // loads new tweets
  $(".nav-text").click(() => {
    if($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp();
    } else {
      $(".new-tweet").slideDown();
    }
  })

  $("#form").submit(function(event) {
    event.preventDefault();
    // hides the error message when the 'submit' button is clicked
    $(".error-message").html(" ");
    $(".error-message").slideUp(0);

    const inputData = $(".input-bar").val();

    let isValid = true;

    if (!inputData) {
      $(".error-message").html("<i class='fa-solid fa-circle-exclamation'></i> &emsp;Please input some text.");
      $(".error-message").slideDown(400);
      isValid = false;
    }

    if (inputData.length > 140) {
      $(".error-message").html("<i class='fa-solid fa-circle-exclamation'></i> &emsp;Please stay under 140 characters.");
      $(".error-message").slideDown(400);
      isValid = false;
    }

    if (isValid) {
      // convert JSON data to query-text format
      const serializedData = $(this).serialize();
      console.log(serializedData);

      // jQuery AJAX post request
      $.post("/tweets", serializedData).then(() => {
        loadTweets();
      });
    } 
    
  });


});