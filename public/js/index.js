$(document).ready(function() {
	$('#create').click(function () {
		if ($("#key").val().length == 0 || $("#link").val().length == 0) {
			return;
		}
		$.post('/link', {
			linkKey: $("#key").val(),
			linkURL: $("#link").val()
		}, function(res) {
			$("#message").html(res.message);
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
});