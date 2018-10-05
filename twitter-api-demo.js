// npm install twit --save 
var Twit = require('twit');
// npm install moment --save
var moment = require('moment');

// config.js is an external js script containing the consumer API keys.
// The key contained there is formatted to only authenticate for the app, not the user account it belongs to.
var config = require('./config');

// Sets T as the Twitter API client with our API keys
var Twitter = new Twit(config);

// Username textbox value should be pulled into the variable `twitterUser`
var twitterUser = 'dril';

// This part sets the tweet search range. We'll default it to the past week for now.
// If we implement the range slider, the slider knob values will be pulled into these variables.
var startDaysAgo = 7;
var endDaysAgo = 0;
var startDate = moment().subtract(startDaysAgo, 'd').format('YYYY-MM-DD');
var endDate = moment().subtract(endDaysAgo, 'd').format('YYYY-MM-DD');

// This part is the search query for the API endpoint.
var searchQuery = {
    tweet_mode: 'extended',
    q: 'from:' + twitterUser + ' ' + 'since:' + startDate + ' ' + 'until:' + endDate
};

// This is the Twitter client's API call. 
Twitter.get('search/tweets', searchQuery, tweetContent);

// This formats the response so we only get the text of the Tweet object
function tweetContent(err, data, response) {
    var tweets = data.statuses;
    var userTweetChunk = '';
    for (var i = 0; i < tweets.length; i++) {
        // The actual data that Socimood will consume for sentiment analysis is a concatenated chunk of all retrieved tweet text
        userTweetChunk += (tweets[i].full_text + '\n' + '\n');
    }
    console.log(userTweetChunk.trim());
};