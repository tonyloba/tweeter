/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function() { 

  function createCont(str) {
    var div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
   }

   function createTweetElement(tweet) {
    let name = tweet.user.name
    let smallAvatar = tweet.user.avatars.small
    let handle = tweet.user.handle
    let content = tweet.content.text
    // let timestamp = $.timeago(tweet.created_at)
    let $tweet = $(
        `<article class="tweet"> 
         
          <div class = "hdr">
            <div class="user">
              <span>
                <img src="${tweet.user.avatars}" class="tweet-avatar"></img>
                ${tweet.user.name}
              </span>
            </div>
            <span class="handle">${tweet.user.handle}</span>
          </div>
          
          <div class="tweeter">${createCont(tweet.content.text)}</div>
          <footer>
            <span class="data">10 hrs ago</span>
            <span class="err"></span>
            <icons>
              <i class="fas fa-flag fa-3xs"></i>
              <i class="fas fa-retweet fa-3xs"></i>
              <i class="fas fa-heart fa-3xs"></i>
            </icons>
          </footer>
        </article>`);
      return $tweet;
    }


  const renderTweets = (tweets) => {
    // clear out container
    //  $('#tweets-container').empty();   
    for(const tweet of tweets) {      
      const $tweet = createTweetElement(tweet);
      //  appends $tweet  to the tweets container
      $('#tweets-container').prepend($tweet);  //or append
    }
  }


  /// SUBMIT FORM:

  $("#new-tweet").on('submit', function (event) {
    // Prevent the default form sumission process
    event.preventDefault();
    // Serialize() turns form data into query string for server format 
    const serializeData = $(this).serialize();


    //  returns  text value 
    const strLength = $("#tweet-text").val().length;

    if (!strLength) {
      alert('Tweet field is empty!')       
    } 
    if (strLength > 140) {
      alert('Character count is over the limit!');
      
    }

    $.ajax({ 
      url:"/tweets", 
      data: serializeData, 
      method: "POST",
    }).then(() => loadTweets())
    $(".tweet-box").trigger("reset"); //clear the message from the box after submit box is hit
    $("#counter").text('140'); // resets counter to 140


    });

    const loadTweets = function() {
      $.ajax({
        url: "/tweets", 
        method: "GET",
        dataType:"json",
        success: "it was a success"
      }).then((tweets) => renderTweets(tweets))
    }
    loadTweets();

    
  });


