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

console.log('看三小!? 這麼愛看人家內褲請參加 http://hitcon.org/2013/wargame/')
