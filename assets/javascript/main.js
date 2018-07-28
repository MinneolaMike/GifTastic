// Document Ready Function
$(document).ready(function () {

    //Array of suggested buttons
    var suggested = ["Hello", "People Falling", "Hilarious", "Just Kidding", "What You Doing?", "Dogs Playing", "Dogs Swimming", "Shaking My Head", "Are You Kidding", "Love You"];

    function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttonzone").empty();

        // Looping through the array of movies
        for (var i = 0; i < suggested.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var button = $("<button>");
            // Adding a class
            button.addClass("topic");
            // Adding a data-attribute with a value of the movie at index i
            button.attr("data-name", suggested[i]);
            // Providing the button's text with a value of the movie at index i
            button.text(suggested[i]);
            // Adding the button to the HTML
            $("#buttonzone").prepend(button);
        }
    }
    renderButtons();

    $("#search").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newtopic = $("#textarea").val().trim();
        // The movie from the textbox is then added to our array
        suggested.push(newtopic);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    $(document).on("click", ".topic", showGIF);
    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function showGIF() {

        var buttonpicked = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonpicked + "&api_key=ZrF1pqmshLKHkJwaz3V7vO5ol3tHXOLm&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // Storing an array of results in the results variable
            var result = response.data;

            // Looping over every result item
            for (var i = 0; i < result.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (result[i].rating !== "r" && result[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = result[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var one = $("<p>").text("Rating: " + rating);

                    // Storing the result item's rating
                    var title = result[i].title;

                    // Creating a paragraph tag with the result item's rating
                    var two = $("<p>").text("Title: " + title);

                    // Creating an image tag
                    var gifImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    gifImage.attr("src", result[i].images.fixed_width_still.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(two);
                    gifDiv.append(one)
                    gifDiv.append(gifImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#GIFarea").prepend(gifDiv);
                }
            }
        });
    }
})