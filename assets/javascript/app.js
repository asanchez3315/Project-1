var Twit = require('twit');
var moment = require('moment');

var config = require('./config');

var Twitter = new Twit(config);

$(document).ready(function() {
  $("#submit-button").click(function() {
    // Capture value of input and send to twitter api
    var twitterUser = $('#input').val;
    console.log(twitterUser);

    var startDaysAgo = 7;
    var endDaysAgo = 0;
    var startDate = moment().subtract(startDaysAgo, 'd').format('YYYY-MM-DD');
    var endDate = moment().subtract(endDaysAgo, 'd').format('YYYY-MM-DD');

    var searchQuery = {
      tweet_mode: 'extended',
      q: 'from:' + twitterUser + ' ' + 'since:' + startDate + ' ' + 'until:' + endDate
    };
    // Twitter api call
    Twitter.get('search/tweets', searchQuery, tweetContent);
  });

  $("#input").val("");
});

function tweetContent(err, data, response) {
  var tweets = data.statuses;
  var userTweetChunk = '';
  for (var i = 0; i < tweets.length; i++)
    userTweetChunk += (tweets[i].full_text + '\n' + '\n');
  console.log(userTweetChunk.trim());
};