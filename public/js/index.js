$('#create').click(function () {
  $.post('/link', {key: $("#key").val(), link: $("#link").val()}, function (data) {
    console.log(data);
  });
}, 'json');