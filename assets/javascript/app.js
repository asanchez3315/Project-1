
$(document).ready(function() {
  console.log('Document is ready');

  // listen for an enter keypress and treat it like a button click
  $('#input').keypress(function(event) {
    if(event.which == 13) 
      $('#submit-button').click();
  });

  // When input is submitted, call the handler
  $('#submit-button').on('click', function() {
    var $capturedInput = $('#input').val(); 

    // Example output to the console
    console.log( $capturedInput );

    // Reset the input field after entry
    $('#input').val('');
  });
  
}); // End $(document).ready()

/* Code for the Meaning Cloud call 

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
 */
