// API KEY for Giphy
var key = '51d500a55d6649e7b4519a36d23704a3';
// Stores gifDiv in a variable
var gifDiv = $('#gifDiv');
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

  // If element exists already, delete it and replace.
  var element = document.getElementById(keyWord+'li');
  if (element){
    element.parentNode.removeChild(element);
  }
    // Query URL
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + keyWord + '&limit=25&offset=0&rating=G&lang=en';

    // Performs API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Does nothing if Ajax returns error.
      if (response.data[0] !== undefined){
        // Array to prevent same gif from being called.
        var arr = [];

        var li = $('<li>');
        li.attr('id',keyWord+'li');
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
        newDivHeader.prepend(newI);
        newDivHeader.prepend(newSpan);

        var newDivBody = $('<div>');
        newDivBody.addClass('collapsible-body center');


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

        // Appends Elements
        li.append(newDivHeader);
        li.append(newDivBody);
        gifDiv.prepend(li);

        // Opens collapsible-body
        $('.collapsible').collapsible('open',0);

        // Turns on gifDiv if hidden
        if(!gifDiv.is(':visible')){
          gifDiv.show();
        }
      }
    });
});

// ES6 Capitlize words in a string
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
