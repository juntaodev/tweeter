/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("new beenz");


  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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
        <div>${data.created_at}</div>
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

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // get return value and append it to tweets container
    tweets.forEach(element => {
      const $tweet = createTweetElement(element);
      $("#tweets-container").append($tweet[0]);
    });
  };

  renderTweets(data);

  


});