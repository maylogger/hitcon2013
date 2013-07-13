CanvasRenderingContext2D.prototype.drawCircle = function( lineWidth, color, center, radius, fill ) {
  this.beginPath();
  this.lineWidth = lineWidth * r;
  this.strokeStyle = color;
  this.arc( center.x, center.y, radius, 0, 2*Math.PI, false );
  this.stroke();    
  if( fill ) {
    this.fillStyle = color;
    this.fill();
  }
};

CanvasRenderingContext2D.prototype.drawLine = function( options ){
  this.beginPath();
  this.strokeStyle = options.color;
  this.lineWidth   = options.lineWidth;
  this.moveTo( options.from[0], options.from[1] );
  this.lineTo( options.to[0], options.to[1] );
  this.stroke();   
}

CanvasRenderingContext2D.prototype.drawLines = function( options ){
  this.beginPath();
  this.strokeStyle = options.color;
  this.lineWidth   = options.lineWidth;

  for( var i = 0 ; i < options.pathes.length ; i ++ ) {
    this.moveTo( options.pathes[i].from[0], options.pathes[i].from[1] );
    this.lineTo( options.pathes[i].to[0], options.pathes[i].to[1] );
  }
  this.stroke();
}

var is_retina = window.devicePixelRatio > 1;
// var is_retina = false;

var r = is_retina ? 2 : 1;


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

Math.constrain = function( x, min, max ) {
  if( x >= max ) return max;
  else if( x <= min) return min;
  else return x;
}

Math.avg = function() {
  var total = 0;
  for( var i = 0 ; i < arguments.length ; i ++ ) {
    total += arguments[i];
  }

  return total / arguments.length;
}

Math.Random = function( min, max, round ) {
	var num = ( ( Math.random() * ( max - min ) ) + min ); 
	return ( round ) ? Math.round( num ) : num;
}

Math.dist = function( x1, y1, x2, y2 ) {
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.sqrt( dx*dx + dy*dy );
}

Array.prototype.do = function( act ) {
  for( var i = 0 ; i < this.length ; i ++ ) {
    this[i][act]();
  };
}

// Physix
var	TO_RADIANS = Math.PI / 180,
	  TO_DEGREES = 180 / Math.PI;

		
/*************************************************************************************************************************/
function _site() {
  if( !window.site) {
    window.site = new Site();
    return window.site;
  }
  
  else return window.site;
}

function google_push( pseudo_url) {
  xx( "google push: " + pseudo_url );
  return _gaq.push(['_trackPageview', pseudo_url]);
}

Math.map = function ( value, a, b, A, B ) {
  // a: min,        b: max
  // A: target.min, B: target.max
  var res = A + ( value - a )*(B - A)/(b - a);
  return res;
}

function is_debug() {
  var url = window.location + '';
  var debug = url.indexOf('debug');
  
  if( debug != -1 ) return true;
  return false;
}

function is_static() {
  var url   = window.location + '';
  var debug = url.indexOf('static');
  
  if( debug != -1 ) return true;
  return false;
}

var KEY_ENTER   = 13,
    KEY_ESC     = 27,
    KEY_SPACE   = 32,
    KEY_P_UP    = 33,
    KEY_P_DOWN  = 34,
    KEY_P_RIGHT = 35,
    KEY_P_LEFT  = 36,
    KEY_LEFT    = 37,
    KEY_UP      = 38,
    KEY_RIGHT   = 39,
    KEY_DOWN    = 40,
    KEY_DEBUG   = 192;

function xx(t) {
  if ( window.console && console.log ) { 
    if( !t && t != 0 ) return console.log('----------');
    return console.log(t); 
  }
  if ( ! document.getElementById('xx') ) return;
  document.getElementById('xx').value += t + '';
}

function xxx(t) {
  if( window.logged ) return;
  window.logged = true;
  if ( window.console && console.log ) { 
    if( !t && t != 0 ) return console.log('----------');
    return console.log(t); 
  }
  if ( ! document.getElementById('xx') ) return;
  document.getElementById('xx').value += t + '';
}

if (!Function.prototype.bind) {    
  Function.prototype.bind = function (oThis) {  
  
    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function  
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");  
  
    var aArgs = Array.prototype.slice.call(arguments, 1),   
        fToBind = this,   
        fNOP = function () {},  
        fBound = function () {  
          return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));      
        };  
  
    fNOP.prototype = this.prototype;  
    fBound.prototype = new fNOP();  
  
    return fBound;  
  
  };  
  
}