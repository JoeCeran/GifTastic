$(document).ready(function() {

var buttons = ["Korg M1", "Yamaha DX7", "Roland D50", "Moog Minimoog", "Oberheim", "Akai MPC", "Kawai"];
  
//code for displaying the buttons
    function populateButtons() {
        $("#show-buttons").empty();
        for (var i = 0; i < buttons.length; i++) {
            var synthBtn = $("<button>");
            synthBtn.addClass("btn btn-lg normal-button");
            synthBtn.attr("data", buttons[i]);
            synthBtn.text(buttons[i]);
            $("#show-buttons").append(synthBtn);
        }
    }

    function populateInput() {
      //creates input for typing in new buttons
        var moreInput = $("<input>");
            moreInput.addClass("form-control");
            moreInput.attr("type", "text");
            moreInput.attr("id", "inputText");
            moreInput.attr("placeholder", "Enter something...");
      //creates the submit button for the input
            var submitInput = $("<br><button>");
            submitInput.addClass("btn submit");
            submitInput.attr("id", "submit");
            submitInput.text("Submit");
            moreInput.append(submitInput);
            $("#input").append(moreInput);
            $("#input").append(submitInput);
    }

    //code for pulling the gifs from the gif servers
    function clickOn() {
    $(".btn").click(function() {
        var synth = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          synth + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
          $("#gifs").empty();
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            p.attr("id", "wrap");
            p.addClass("badge badge-secondary");
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url.replace(".gif", "_s.gif"));
            animalImage.addClass("gifs");
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height.url.replace(".gif", "_s.gif"));
            animalImage.attr("data-state", "still");
            animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.attr("id","gifDiv")
            $("#gifs").prepend(animalDiv);
          }
          clickGif();
          });
      });
    }

    //code for when the submit button is clicked
    function clickSubmit() {
    $(".submit").on("click", function(event) {
        event.preventDefault();
        var newSynth = $("#inputText").val().trim();
        buttons.push(newSynth);
        populateButtons();
        clickOn();
      });
    }

    //code for when a gif is clicked
    function clickGif() {
      $("img").on("click", function(){
      var state = $(this).attr("data-state");
      if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
      });
    }

    populateButtons();
    populateInput();
    clickOn();
    clickSubmit();
    
    
});