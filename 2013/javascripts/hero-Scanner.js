(function($){
var ns = "Scanner";

window[ns] = function( options ) {
  $.extend( this, options );
  this.prepare();
  this.init();
};

window[ns].prototype = {
  prepare: function() {
    this.panel  = $('<div class="scanner-panel"/>');
    this.switch = $('<div class="scanner-switch" />').appendTo( this.panel);
    this.complete = $('<span class="scanner-complete" />').appendTo( this.panel );

    this.wrapper.append( this.panel );
  },

  init: function() {
    this.radius = 25*1.5*r;
    this.height = this.radius * 2 - 12 * r;

    this.left   = 0;
    this.top    = (this.height - this.radius ) /2;
    this.right  = this.left + this.width;
    this.bottom = this.top + this.height;

    this.center = {
      x: this.left + 50*r,
      y: this.top + this.radius
    };

    this.inner = new Circle({
      radius: this.radius * .4,
      k: Math.Random( 50, 150, true ),
      outer: this
    });

    this.deep = new Circle({
      radius: this.inner.radius * .4,
      k: Math.Random( 10, 100, true ),
      outer: this.inner
    });

    this.moveCircles = [ this.inner, this.deep ];

    this.hexagonK    = Math.Random(100, 1000, true);
    this.ctx.globalCompositeOperation = "lighter";
  },

  animate: function() {
    this.update();
    this.draw();
  },

  update: function() {
    this.deep.radius += Math.sin( site.frameCount/100 )/20;
    this.moveCircles.do('update');
  },

  draw: function() {
    this.ctx.drawCircle(  1, "rgba( 30, 170, 200, .5)", this.center, this.radius ); // outer
    this.drawHexagon();
    this.ctx.drawCircle(  1, '#2d0508', this.center, r ); // center
    this.ctx.drawCircle( .5, "#cd4a96", this.inner.center, this.inner.radius ); // inner
    this.ctx.drawCircle( 1, "#83a5e8", this.deep.center,  this.deep.radius  ); // deep

    this.ctx.drawCircle( 2, "red", this.inner.edge, 2, true );
    this.ctx.drawCircle( 1, "#fff", this.deep.edge, 2, true );
  },

      drawHexagon: function() {
        var thita = -(site.frameCount + this.hexagonK ) /this.hexagonK;
        var angle;

        this.ctx.beginPath();
        this.ctx.moveTo( this.center.x + ( this.radius ) * Math.cos( thita ), this.center.y + ( this.radius ) * Math.sin( thita ) );
        for( var i = 1 ; i < 6 ; i++ ) {
          angle = thita + (360/6)*i * TO_RADIANS;
          this.ctx.lineTo( this.center.x + ( this.radius ) * Math.cos( angle ), this.center.y + ( this.radius ) * Math.sin( angle ) );
        }
        this.ctx.lineTo( this.center.x + ( this.radius ) * Math.cos( thita ), this.center.y + ( this.radius ) * Math.sin( thita ) );

        this.ctx.lineWidth   = .5 * r;
        this.ctx.strokeStyle = "rgba(0, 130, 120, .7)";
        this.ctx.fillStyle   = "rgba(0, 70, 120, .2)";
        this.ctx.fill();
        this.ctx.stroke();
      },


};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Circle = function( options ) {
  $.extend( this, options );
};

Circle.prototype = {
  update: function() {
    this.thita = ( site.frameCount + this.k ) / this.k;
    this.hypo  = this.outer.radius - this.radius;

    this.edge = {
      x: this.outer.center.x + this.getX( this.outer.radius ),
      y: this.outer.center.y + this.getY( this.outer.radius )
    }

    this.center = {
      x: this.outer.center.x + this.getX( this.hypo ),
      y: this.outer.center.y + this.getY( this.hypo )
    }
  },

  getX: function( distance ) {
    return distance * Math.cos( this.thita );
  },

  getY: function( distance ) {
    return distance * Math.sin( this.thita );
  },
};

})(jQuery);