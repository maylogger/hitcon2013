(function($){
var ns = "Titlebar";

window[ns] = function( options ) {
  $.extend( this, options );
  this.prepare();
};

window[ns].prototype = {
  prepare: function() {
    this.shortLine = new Bar({
      y: 2,
      length: 5,
      parent: this,
      ctx: this.ctx
    });

    this.longLine = new Bar({
      y: 4,
      length: 9,
      parent: this,
      ctx: this.ctx
    });
    this.lines = [ this.shortLine, this.longLine ];
  },

  animate: function() {
    this.update();
    this.draw();
  },

  update: function() {
    
  },

  draw: function() {
    this.lines.do('draw');
  },
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Bar = function( options ) {
  $.extend( this, options );
  this.left  = 0;
  this.width = this.length * 25/2*r;
  this.right = this.left + this.width;
  this.top   = this.y * r;

  this.startPoint = {
    x: this.left,
    y: this.top
  }

  this.endPoint = {
    x: this.right,
    y: this.top
  }
};

Bar.prototype = {
  draw: function() {
    this.drawLength();
    this.drawExtremities();
    this.drawSeparates();
  },

  drawSeparates: function() {
    for( var i = 1; i < this.length ; i ++ ) {
      this.ctx.drawCircle( 0, "rgba(255, 255, 255, .5)", {
        x: this.left + i * this.width/this.length,
        y: this.top
      }, 1, true );
    }
  },

  drawExtremities: function() {
    this.ctx.drawCircle( 0, "#fff", this.startPoint, 1, true );
    this.ctx.drawCircle( 0, "#fff", this.endPoint, 1, true );
  },

  drawLength: function() {
    this.ctx.drawLine({
      color: "rgba(255, 255, 255, 0.5)",
      from: [ this.left + 2 * r, this.top ],
      to: [ this.right, this.top ]
    });
  },
};

})(jQuery);