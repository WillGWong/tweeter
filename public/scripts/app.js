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
  evt.preventDefault();
  let formtext = form.serialize()
  if(formtext.length > 145) {
    alert("Over 140 characters!")
  } else { 
     $.ajax({
        url: '/tweets',
        type: 'POST',
        data: formtext 
      })
        .done(() => loadTweets())
        .fail(err => {
        alert('Failed to submit data');
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

})