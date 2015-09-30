$(document).ready(function() {
	$('#create').click(function () {
		$.post('/link', {
			linkKey: $("#key").val(),
			linkURL: $("#link").val()
		}, function(res) {
			$("#message").html(res.message);
			if (res.success) {
				$(".message").css("color", "#04ea77");
			}
			else {
				$(".message").css("color", "#ff0000");
			}
		});
	});
});