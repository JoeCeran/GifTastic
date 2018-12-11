$(document).ready(function() {

var buttons = ["Korg M1", "Yamaha DX7", "Roland D50"];
  

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
        var moreInput = $("<input>");
            moreInput.addClass("input");
            $("#input").append(moreInput);
    }

    function populateInputBtn() {
        var submitInput = $("<button>");
            submitInput.addClass("submit");
            submitInput.attr("id", "submit");
            submitInput.text("Submit");
            $("#input").append(submitInput);
    }


    function clickOn() {
    $(".btn").click(function() {
        var synth = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          synth + "&api_key=dc6zaTOxFJmzC&limit=10";
        alert(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
  
            for (var i = 0; i <= 10; i++) {
              var gifDiv = $("<div>");
              var synthImage = $("<img>");
              synthImage.attr("src", results[i].images.fixed_height.url);
              gifDiv.prepend(synthImage);
              $("#gifs").prepend(gifDiv);
            }
          });
      });
    }

    function clickOn2() {
    $(".submit").on("click", function(event) {
        event.preventDefault();
        var newSynth = $(".input").val().trim();
        buttons.push(newSynth);
        populateButtons();
        alert(newSynth);
      });
    }

    populateButtons();
    populateInput();
    populateInputBtn();
    clickOn();
    clickOn2();
    
});