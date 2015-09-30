$(document).ready(function() {
	$('#create').click(function () {
		$.post('/link', {
			linkKey: $("#key").val(),
			linkURL: $("#link").val()
		}, function(res) {
			$("#error").val(res.error);
		});
	});
});