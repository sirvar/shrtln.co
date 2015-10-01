/*
(c) 2015 Rikin Katyal
index.js
*/
$(document).ready(function() {
	// Send post request to create link
	$('#create').click(function () {
		// Make sure not blank
		if ($("#key").val().length == 0 || $("#link").val().length == 0) {
			return;
		}
		//Post to link
		$.post('/link', {
			linkKey: $("#key").val(),
			linkURL: $("#link").val().replace("http://", "").replace("https://", "")
		}, function(res) {
			//Set message
			$("#message").html(res.message);
			//Set message color to green or red based on success or failure
			if (res.success) {
				$(".message").css("color", "#04ea77");
				$("#key").val("")
				$("#link").val("")
			}
			else {
				$(".message").css("color", "#ff0000");
			}
		});
	});

	// Randomly generate key value
	$("#random").click(function() {
		$("#key").val(Math.random().toString(36).substring(2,12))
	})

	// Question mark click alert
	$("#about").click(function() {
		alert("shrtln.co is a simple link shortner with the ability to customize the shortened link. Feel free to use this as much as you want. Don't worry, I wont delete your links and they are 100% private.")
	})
});