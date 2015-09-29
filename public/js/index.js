$(document).ready(function() {
	$('#create').click(function () {
		console.log("clicked");
		$.post('/link', {
			linkKey: $("#key").val(),
			linkURL: $("#link").val()
		});
	});
});