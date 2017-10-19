$(document).ready(function() {

	$("#submit").on("click", function(){
		event.preventDefault();
		var newFriend = {
		    name: $("#name").val().trim(),
		    photo: $("#photo").val().trim(),
		    scores: [$("#q1").val().trim(), $("#q2").val().trim(), $("#q3").val().trim(), $("#q4").val().trim(), $("#q5").val().trim(), $("#q6").val().trim(), $("#q7").val().trim(), $("#q8").val().trim(), $("#q9").val().trim(), $("#q10").val().trim()]
		}
		var counter = 0;
		if (newFriend.name === "" || newFriend.photo === "") {
			counter++;
		}
		for (var i = 0; i < newFriend.scores.length; i++) {
			if (newFriend.scores[i] === "") {
				counter++;
			}
		}
		var currentURL = window.location.origin;
		//only post if all fields are complete
		if (counter === 0) {
			//post the newFriend information
			$.post(currentURL + "/api/new", newFriend) 
			.done(function(data) {
				
				console.log(data)
				
			    $(".modal-body").empty();
			    for (var i = 0; i < data.length; i++) {
		    			var matchName = $("<h2>");
		    			matchName.text(data[i].name);
		    			$(".modal-body").append(matchName);
		    			var matchImg = $("<img>");
		    			matchImg.addClass("match-image");
		    			matchImg.attr("src", data[i].photo);
		    			$(".modal-body").append(matchImg);
		     		}
		     		$("#resultsModal").modal("toggle");
			});
		} else {
			alert("Please fill out all fields before submitting!")
		}
	});
});