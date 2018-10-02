var userName = $('#Input')
var count = $('#amount-of-tweets')
var queryURL = `'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userName}&count=${count}`

$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response)
    })