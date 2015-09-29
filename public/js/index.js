$(document).ready(function() {
	$('#create').click(function () {
		console.log("clicked");
	  $.post('/link');
	});
});