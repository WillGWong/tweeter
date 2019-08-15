$(document).ready(function() {
  $("#textbox").keydown(function(){
    $("#charCount").text((140 - $("#textbox").val().length));
  if ($("#textbox").val().length > 140) {
    $("#charCount").css({"color": "red"})
  }
  if ($("#textbox").val().length < 140) {
    $("#charCount").css({"color": "grey"})
  }
  });
});