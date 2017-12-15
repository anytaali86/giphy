// Initial array of actors
	var actors = ["Chris hemsworth", "Benedict cumberbatch", "Tom hiddleston", "JenniferAniston", "Robert Downey Junior", "Chris Pine"];

//renders buttons on load
renderButtons();


// display displayArtistGif function re-renders the HTML to display the appropriate content
	function displayActorGif () {
		var actors = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actors + "&limit=10&api_key=RPxQK6gdY7RI33Zyt9U3jnUf9aZOocKu";
		console.log("Actor: " + actors);
		console.log("queryURL: " + queryURL);

// AJAX call for the specific button being clicked 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

// div to hold all the gifs 
	displayAll = $("<div>");


// For loop to append a button for each string in the array
	for (var i = 0; i < 10; i++) {

// div to hold the gif 
	displayTag = $("<div class='gifs'>");

// Create div to hold and display the rating 
	diplayRating = $("<div>");
	diplayRating.append ("Rating:" + response.data[i].rating);

//Create div to hold and display the gif
	dGif = $("<div>");

	var image = $("<img class='gif' data-state='still'>");
		image.attr("src", response.data[i].images.fixed_height_still.url);
		image.attr("data-still", response.data[i].images.fixed_height_still.url);
		image.attr("data-animate", response.data[i].images.fixed_height.url)

	dGif.append(image)

			
//put the div displayTag together
	displayTag.append(dGif);
	displayAll.append(displayTag);
	displayTag.append(diplayRating);


	}

		$("#gifDiv").html(displayAll);

	}); // ends AJAX call

} // ends displayArtistGif function



//Function to render buttons
	function renderButtons() {

//Empties the div
	$("#buttons-view").empty();

//Loops through the array of actors
	for (var i = 0; i < actors.length; i++) {
		var a = $("<button class='actor'>");
		a.attr("data-name", actors[i]);
		a.text(actors[i]);
		$("#buttons-view").append(a);
	}

} //end of renderButtons function


//Function for add actor button
$("#add-actor").on("click", function(event) {

	event.preventDefault();
		var actor = $("#actor-input").val().trim();
		actors.push(actor);
		renderButtons();

}); 



//  click event listener 
$(document).on("click", ".actor", displayActorGif);


//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click