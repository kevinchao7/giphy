// API KEY for Giphy
var key = '51d500a55d6649e7b4519a36d23704a3';
// Stores gifDiv in a variable
var gifDiv = $('#gifDiv');
var gifLoadArr = [];
gifDiv.hide();

// "Create Button" click function
$('#createBtn').on('click', function(evt) {
  evt.preventDefault();
  // Grabs input field text
  var fieldText = $('#keyWord').val();
  $('#keyWord').val('');
  if (fieldText !== '' && !document.getElementById(fieldText)) {
    // Btn Element
    var btn = $('<a>');
    // Adds text to button
    btn.text(fieldText);
    // Grabs Button Div
    var btnDiv = $('#buttons');
    // Change button id to keyword
    btn.attr('id', fieldText);
    // Adds class
    btn.addClass('apiBtn btn waves-effect waves-light');
    // Appends button
    btnDiv.append(btn);
  }
});


// Click function for buttons on the div
$('#buttons').on('click', '.apiBtn', function() {
  // Grabs keyWord of button
  // Keyword for ajax request
  var keyWord = $(this).attr('id');

  if (gifLoadArr.indexOf(keyWord) === -1) {
    // Query URL
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + keyWord + '&limit=25&offset=0&rating=G&lang=en';

    console.log(keyWord);

    // Performs API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Array to prevent same gif from being called.
      var arr = [];

      var li = $('<li>');
      // Creates collapsible Div
      var newDivHeader = $('<div>');
      newDivHeader.addClass('collapsible-header');

      var newSpan = $('<span>');
      newSpan.addClass('badge');
      newSpan.text(10);

      var newI = $('<i>');
      newI.addClass('material-icons');
      newI.text('image');
      newDivHeader.text((keyWord.toLowerCase()).capitalize());

      var newDivBody = $('<div>');
      newDivBody.addClass('collapsible-body');


      // While loop to append 10 images
      while (arr.length < 10) {
        // Generates random number
        var random = Math.floor(Math.random() * 25);


        if (arr.indexOf(random) === -1) {
          // Creates img Element
          var img = $('<img>');
          img.addClass('giphy');
          // Adds image to src
          img.attr('src', response.data[random].images.downsized.url);
          newDivBody.append(img);
          arr.push(random);
        }

        // Log if stuck in a while loop
        console.log('im in a while loop');
      }

      li.append(newDivHeader);
      li.append(newDivBody);
      gifDiv.append(li);
    });
    gifLoadArr.push(keyWord);
    // Turns on gifDiv if hidden
    if(!gifDiv.is(':visible')){
      gifDiv.show();
      console.log('show');
    }
  }
});

// ES6 Capitlize words in a string
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
