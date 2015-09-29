$(document).ready(function() {
	$('#create').click(function () {
		console.log("clicked");
		$.post('/link', {
			linkKey: "rikinkatyal",
			linkURL: "http://sirvar.com"
		});
	});
});