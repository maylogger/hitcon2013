(function($){
var ns = "Pointer";

window[ns] = function( options ) {
  $.extend( this, options );
  this.init();
};

window[ns].prototype = {
  init: function() {
    var w = 5;
    var h = 3.7;
    this.bgp = [
      {x: 0,   y: 0 },
      {x: w/2, y: 1 + .5 },
      {x: w,   y: 0 },
      {x: w,   y: h },
      {x: w/2, y: 3 - .5 },
      {x: 0,   y: h }
    ];

    this.rate = 20 * r * Math.map( this.width, 0, 200*r, 0, 1);

    this.startPoint = {
      x: ( this.width - w * this.rate ) /2,
      y: ( this.height - h * this.rate )/2
    };
    
    this.height = h * this.rate;
    this.width  = w * this.rate;
    this.top    = this.startPoint.y;
    this.bottom = this.top + this.height;
    this.left   = this.startPoint.x;
    this.right  = this.left + this.width; 


    this.mvpG = [
      {x: this.left - 100, y: this.bottom },
      {x: this.left + Math.random() * this.width, y: this.bottom },
      {x: this.right - 100, y: this.bottom },
    ]
  },

  animate: function() {
    this.update();
    this.draw();    
  },

  update: function() {
    this.updateMvp();
  },

      updateMvp: function() {
        this.mvpG[0].x += Math.sin( site.frameCount/100 + 100 );
        this.mvpG[1].x += Math.sin( site.frameCount/100 + 20);
        this.mvpG[2].x += Math.sin( site.frameCount/100 );
      },

  draw: function() {
    this.drawBackground();
    this.drawLines();
  },

      drawBackground: function() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(30, 40, 60, .7)';
        this.ctx.moveTo( this.bgp[0].x * this.rate + this.startPoint.x, this.bgp[0].y * this.rate + this.startPoint.y );
        for( var i = 1 ; i < this.bgp.length ; i ++ ) {
          this.ctx.lineTo( this.bgp[i].x * this.rate + this.startPoint.x, this.bgp[i].y * this.rate + this.startPoint.y );
        }
        this.ctx.lineTo( this.bgp[0].x * this.rate + this.startPoint.x, this.bgp[0].y * this.rate + this.startPoint.y );
        this.ctx.fill();
      },

      drawLines: function() {
        var p1, p2, p3, p4, pm12;
        for( var i = 0 ; i < 4 ; i ++ ){
          p1 = this.getBgp( Math.floor(i/2)*2 );
          p2 = this.mvpG[i];

          if( i == 3 ) p2 = this.mvpG[1];

          pm12 = { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
          p3   = { x: p1.x,            y: this.bottom     };
          p4   = { x: p2.x,            y: this.top        };


          this.ctx.lineWidth = 1.2 * r;
          this.drawLine( "rgba(20, 130, 120, 1)", p1, pm12 ); // green top
          this.drawLine( "rgba(170, 20, 50, 1)", p3, pm12 ); // red bottom

          this.ctx.lineWidth = 1 * r;
          this.drawLine( "rgba(20, 130, 120, .5)", pm12, p2 ); // green bottom
          this.drawLine( "rgba(170, 20, 50, .3)", pm12, p4 ); // red top
        }
      },

      drawLine: function( color, start, end ) {
        this.ctx.drawLine({
          color: color,
          from: [ start.x, start.y ],
          to: [ end.x, end.y ]
        });
      },

  getBgp: function( index ) {
    return {
      x: this.bgp[index].x * this.rate + this.startPoint.x,
      y: this.bgp[index].y * this.rate + this.startPoint.y
    };
  },

};

})(jQuery);