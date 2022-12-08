$(document).ready(function() {
  console.log(this);

  $(".input-bar").on("keyup", function() {
    const counter = $(".counter");
    const characterCount = 140 - $(this).val().length;

    counter.text(characterCount);

    if (characterCount < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });


});