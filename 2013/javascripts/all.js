window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

$(function() {
  $(".main-content").click(function(){
    $(".page").removeClass("show-menu");
  });
  $(".menu-button").click(function(){
    $(".page").toggleClass("show-menu");
    return false;
  });
});
