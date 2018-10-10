var searchText = 'alley cats strike'
var content = $('#rating-display')
var movie
var pos
var neg
var mid
var total

var config = {
  apiKey: "AIzaSyCxHBBx864AiC3kvW2_D-VFTpGA6T9UWXQ",
  authDomain: "fir-project-979c3.firebaseapp.com",
  databaseURL: "https://fir-project-979c3.firebaseio.com",
  projectId: "fir-project-979c3",
  storageBucket: "fir-project-979c3.appspot.com",
  messagingSenderId: "689061306129"
};
firebase.initializeApp(config);


var database = firebase.database();

$(document).ready(function() {
  console.log('Document is ready');

  // listen for an enter keypress and treat it like a button click
  $('#input').keypress(function(event) {
    if(event.which == 13){
      $('#submit-button').click();
    }
  });

  // When input is submitted, call the handler
  $('#submit-button').on('click', function() {
    var $capturedInput = $('#input').val(); 

    $.ajax({
      url: "https://www.omdbapi.com/?t=" + $capturedInput + "&plot=full&apikey=trilogy",
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
        moviePlot = response.Plot
        $.ajax({
          url: 'https://text-sentiment.p.mashape.com/analyze',
          headers: { "X-Mashape-Key": "U9WXEPF7GdmshYXO54mcDYqDyKCCp1mzq6sjsn4qrr6eZV6WZr", "content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
          data: { "text": moviePlot },
          success: function (data) {
            console.log(data);
            var rating = JSON.parse(data)
    
            var movieInfo = {
              movie: $capturedInput,
              pos: rating['pos_percent'],
              neg: rating['neg_percent'],
              mid: rating['mid_percent'],
              total: rating['totalLines']
            }
          
    
            database.ref().push(movieInfo);
    
          },
          error: function (data) {
            console.log(data);
          }
        })
      })
    

    // Example output to the console
    console.log( $capturedInput );

    // Reset the input field after entry
    $('#input').val('');
    database.ref().remove()
    $('movie-title').text('')
    database.ref().on("child_added", function(childSnapshot) {
      movieName = childSnapshot.val().movie
      pos = Math.floor(childSnapshot.val().pos.replace('%', ''))
      neg = Math.floor(childSnapshot.val().neg.replace('%', ''))
      mid = Math.floor(childSnapshot.val().mid.replace('%', ''))
      total = childSnapshot.val().total
      $('#movie-title').text(movieName)
      drawCircle('circles-pos', pos, '#89d179')
      drawCircle('circles-mid', mid, '#ccca7c')
      drawCircle('circles-neg', neg, '#ce6d6d')
            
      });
  });
  
  
}); // End $(document).ready()

function drawCircle(divId, value, hexColor) {
  Circles.create({
    id:           divId,
    radius:       20,
    value:        value,
    maxValue:     100,
    width:        10,
    text:         function(value){return value + '%';},
    colors:       ['#dbdbdb', hexColor],
    duration:     400,
    wrpClass:     'circles-wrp',
    textClass:    'circles-text',
    styleWrapper: true,
    styleText:    true
  })
  
}

