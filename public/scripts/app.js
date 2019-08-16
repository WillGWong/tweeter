$(document).ready(function() {/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {

  $('#tweets-container').empty()
  for (let i = tweets.length - 1; i > -1; i--) {
    let tweetArticle = createTweetElement(tweets[i])
    $('#tweets-container').append(tweetArticle);
  }
}

//template literal isnt "sanitary", use .text(data.name) to append on <div></div>
const createTweetElement = function(tweet) {
  let $tweet = `<article class="post-tweet">

  <header class="tweetheader">
    <div class="tweet-profile">
        <img src="${tweet["user"]["avatars"]}" /> 
        <div class="username">
            ${tweet["user"]["name"]}
        </div>
    </div>
    <div class="userAt">
      ${tweet["user"]["handle"]}
    </div>
  </header>


    <p class="tweetarticle">
      ${tweet["content"]["text"]}
    </p>

    <footer class="tweetfooter">
      <div class="datePosted">${getDayMonth(tweet["created_at"])}</div>
      <div class="icons">
        <i class='fas fa-flag' style='color:blue'></i>
        <i class='fa fa-retweet' style='color:blue'></i>
        <i class='fas fa-heart' style='color:blue'></i>
      </div>
  </footer>   
</article>`
  return $tweet;
  
}

const getDayMonth = function(timestamp) { 
  let date = new Date(timestamp);
  let monthNum = date.getMonth();
  let day = date.getDay()
  let year = date.getFullYear()
  let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  return day + " " + monthArr[monthNum] + " " + year
}


const form = $('.new-tweet-form');

form.on('submit', (evt) => {
  $(".error").slideUp()
  evt.preventDefault();
  let formtext = form.serialize()
  if(formtext.length > 145) {
    $(".error").empty()
    $(".error").css("display", "flex")
    $(".error").css("justify-content", "space-evenly")
    $(".error").append("<i class='fas fa-radiation-alt' style='font-size:34px;color:red;position:relative;'<></i>")
    $(".error").append("  ERROR! Over 140 characters!  ")
    $(".error").append("<i class='fas fa-radiation-alt' style='font-size:34px;color:red;position:relative;'<></i>")
    $(".error").slideDown()
    return
  } else { 
     $.ajax({
        url: '/tweets',
        type: 'POST',
        data: formtext 
      })
        .done(() => loadTweets())
        .fail(err => {
          $(".error").empty()
          $(".error").css("display", "flex")
          $(".error").css("justify-content", "space-evenly")
          $(".error").append("<i class='fas fa-radiation-alt' style='font-size:34px;color:red;position:relative;'<></i>")
          $(".error").append("  ERROR! No text!  ")
          $(".error").append("<i class='fas fa-radiation-alt' style='font-size:34px;color:red;position:relative;'></i>")
          $(".error").slideDown();
    });
  }
});


const loadTweets = function(){
  $.ajax('/tweets', { method: 'GET' })

  .done(function (tweets) {
    renderTweets(tweets)
  })
  .fail(err => {
    alert('Failed to retrieve data');
  });
}
loadTweets()


$( ".fa-hand-point-down" ).click(function() {
  $( ".new-tweet-form" ).slideToggle( "slow");
});

$(".fa-arrow-alt-circle-up").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
})

$(window).scroll(function() {
  if (document.documentElement.scrollTop > 400){
    $(".to-top").css("display", "inline")
    $(".navright").css("display", "none")
  }
  if (document.documentElement.scrollTop < 400){
    $(".to-top").css("display", "none")
    $(".navright").css("display", "inline")
    }
})

})