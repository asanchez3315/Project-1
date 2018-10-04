

var text = $("#text").val().trim();
var apiKey= "d0c8e8c7a8e01ae93832dcadeab63133"
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.meaningcloud.com/sentiment-2.1",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "key": "d0c8e8c7a8e01ae93832dcadeab63133",
    "lang": "en",
    "txt": text,
    "txtf": "plain",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
