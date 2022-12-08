/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


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
      <article class="tweet">${data.content.text}</article>
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

  const validation = (data) => {
    if (!data) {
      return false;
    }

    if (data.length > 140) {
      return false;
    }

    return true;
  };

  // initial load function
  loadTweets();

  $("#form").submit(function(event) {
    event.preventDefault();

    const inputData = $(".input-bar").val();

    const isValid = validation(inputData);
    console.log(isValid);

    if (isValid) {
      // convert JSON data to query-text format
      const serializedData = $(this).serialize();
      console.log(serializedData);

      // jQuery AJAX post request
      $.post("/tweets", serializedData).then(() => {
        loadTweets();
      });
    } else {
      console.log("no tweets found");
    }
    
  });


});