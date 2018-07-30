// Document Ready Function
$(document).ready(function () {

    //Array of suggested buttons
    var suggested = ["Hello", "People Falling", "Hilarious", "Just Kidding", "What You Doing?", "Dogs Playing", "Dogs Swimming", "Shaking My Head", "Are You Kidding", "Love You"];

    function renderButtons() {

        // Clears the array of the pre-set buttons to allow for just the new button to populate
        $("#buttonzone").empty();

        // Looping through the array suggested topics
        for (var i = 0; i < suggested.length; i++) {

            // Variable to create the button
            var button = $("<button>");
            // Adds a class to the button
            button.addClass("topic");
            // Adds an attribute to the button to house the topic in the input field
            button.attr("data-name", suggested[i]);
            // Gives the button it's nmae
            button.text(suggested[i]);
            // Adds Button to the page
            $("#buttonzone").prepend(button);
        }
    }
    // Calling the function to run on document ready
    renderButtons();

    //Click event for the add more topics button
    $("#search").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // Variable to capture what the user has enetered and trim out all extra spaces
        var newtopic = $("#textarea").val().trim();
        // Handles putting the button on the page
        suggested.push(newtopic);
        // Calling the function again here so that it fires when they hit the add button 
        renderButtons();
    });

    // Function that will add GIF's to the page when they click a topic button
    $(document).on("click", ".topic", showGIF);

    function showGIF() {

        //Variable to take the name of the button and run it through the GIPHY API
        var buttonpicked = $(this).attr("data-name");
        //URL for Giphy API for searching including my key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonpicked + "&api_key=ZrF1pqmshLKHkJwaz3V7vO5ol3tHXOLm&limit=10";

        // AJAX call to the Giphy API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Variable to store the ENTIRE response from GIPHY API
            var result = response.data;

            // Looping over the response from the API
            for (var i = 0; i < result.length; i++) {
                // Checking the rating of the response to make sure it is G or PG only
                if (result[i].rating !== "r" && result[i].rating !== "pg-13") {
                    // Creating a DIV to house the returned, rating appropriate Gif
                    var gifDiv = $("<div>");
                    // Adds a class to the Div for targeting
                    gifDiv.addClass("gifbox");
                    // Variable to store the rating
                    var rating = result[i].rating;
                    // Creates a <p> tag to display the rating
                    var one = $("<p>").text("Rating: " + rating);
                    // Variable to store the Title
                    var title = result[i].title;
                    // Creates a <p> tag to display the title
                    var two = $("<p>").text("Title: " + title);
                    // Creating an <img> tag to display the GIF
                    var gifImage = $("<img>");
                    // Adding a class to the image to target it later
                    gifImage.addClass("still");
                    // adding a data-state to the gif to target later in animation
                    gifImage.attr("data-state", "paused");
                    // Giving the <img> tag a src of Fixed Still to be loaded on search
                    gifImage.attr("src", result[i].images.fixed_height_still.url);
                    // Giving the <img> tag an atrribute linked to a url for animation
                    gifImage.attr("data-paused", result[i].images.fixed_height_still.url);
                    // Giving the <img> tag the other linked url with different state for animation 
                    gifImage.attr("data-moving", result[i].images.fixed_height.url);
                    // Appends the GIF, rating, and title into the Div created
                    gifDiv.append(two);
                    gifDiv.append(one);
                    gifDiv.append(gifImage);
                    // Actually adds the entire Div to the page
                    $("#GIFarea").prepend(gifDiv);
                }
            }

            //On Click function that will animate teh GIF's
            $(document).on("click", ".still", function () {
                // declaring a variable to identify if the image is paused or not
                var animationState = $(".still").attr("data-state");
                // If/Else statement that will switch between animated and still image based on the paused attribute
                if (animationState === "paused") {
                    console.log(result[i]);
                    $(this).attr("src", $(this).attr("data-moving"));
                    $(this).attr("data-state", "moving");
                } else {
                    $(this).attr("src", $(this).attr("data-paused"));
                    $(this).attr("data-state", "paused");
                }
            });
        });
    };
})