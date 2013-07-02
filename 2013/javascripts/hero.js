(function($){
var ns = "Hero";

window[ns] = function( options ) {
  this.data = options;
  this.init();
  this.prepare();
  this.resize();

  xx(this.data);
};

window[ns].prototype = {
  init: function() {
    this.data.width  = this.data.wrapper.width() * r;
    this.data.height = this.data.wrapper.height() * r;
    this.data.right  = this.data.width;
    this.data.bottom = this.data.height;
    this.data.left   = 0;
    this.data.top    = 0;

    $.extend( this, this.data );
  },

  prepare: function() {
    this.root   = $('<canvas />').appendTo( this.wrapper );
    this.canvas = this.root[0];
    this.ctx    = this.canvas.getContext('2d');

    this.data.root   = this.root;
    this.data.canvas = this.canvas;
    this.data.ctx    = this.ctx;
    this.data.parent = this;

    if( !site.callbacks[this.type] ) site.callbacks[this.type] = [];

    site.callbacks[this.type].push(function(){
      this.animator = new window[this.type]( this.data );
      site.animators.push( this.animator );
    }.bind(this));

    if( this.globalIndex != 0 ) return;

    $.getScript( '/2013/javascripts/hero-' + this.type + '.js', function(data, textStatus, jqxhr) {
      var i = site.callbacks[this.type].length;
      while( i-- ) site.callbacks[this.type][i]();
    }.bind(this));
  },

  clear: function() {
    this.ctx.beginPath();
    this.ctx.clearRect( this.left, this.top, this.width, this.height );
  },

  resize: function() {
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
    this.root.css({
      width: this.width/r,
      height: this.height/r
    })
  }
};

})(jQuery);
