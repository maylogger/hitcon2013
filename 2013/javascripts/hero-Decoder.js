(function($){
var ns = "Decoder";

window[ns] = function( options ) {
  $.extend( this, options );
  this.init();
};

window[ns].prototype = {
  init: function() {    
    this.size  = 5;
    this.max   = this.height/r;
    this.bars  = [];
    for( var i = 0 ; i < this.size ; i ++ ) this.bars.push( Math.random()* this.max );

    this.chars = "qwertyuopa";
    this.texts = [
      "LTE",
      "CDMA",
      "HSDPA",
      "SKYPE",
      "GSM"
    ];

    this.resetTbars();
    this.resetIcon();
  },

  animate: function() {
    this.update();
    this.draw();
  },

  update: function() {
    if( ( site.frameCount + this.k ) %  20 == 0 ) this.resetTbars();
    if( ( site.frameCount + this.k ) % 600 == 0 ) this.resetIcon()

    var i = this.size;
    while( i-- ) {
      if( Math.abs( this.bars[i] - this.tbars[i] ) < 2 * r ) return;

      if( this.bars[i] > this.tbars[i] ) this.bars[i] -= 0.7;
      else this.bars[i] += 0.7;
    };
  },


      resetTbars: function() {
        this.tbars = [];
        var number;
        for( var i = 0 ; i < this.size ; i ++ ) {
          number = Math.random()* this.height;
          if( number > this.height/2 ) number *= 1 + .8;
          else number *= 1 - .8;
          number = Math.constrain( number, 0, this.max );
          this.tbars.push( number );
        }
      },

      resetIcon: function() {
        this.k    = Math.Random( 10, 50, true ) * 10;
        this.type = this.chars[ Math.floor( Math.random() * this.chars.length ) ];
        this.text = this.texts[ Math.floor( Math.random() * this.texts.length ) ];
      },

  draw: function() {
    this.drawIcon();
    this.drawBars();
  },

      drawIcon: function() {
        this.ctx.fillStyle = "#7797d6";
        this.ctx.textAlign = "center";

        this.ctx.font = "normal " + 15 * r + "px 'Dingbats2.0OfficeOTRegular', sans-serif";
        this.ctx.fillText( this.type, this.left + ( this.width )/2, this.bottom - 27 * r );

        this.ctx.font = "normal " + 10 * r + "px 'TungstenMedium', sans-serif";
        this.ctx.fillText( this.text, this.left + ( this.width )/2, this.bottom - 12 * r );
      },

      drawBars: function() {
        var i = this.size;
        var bar, max = this.max, mapR, mapG, mapB, mapA;

        while( i-- ) {
          bar = this.bars[i];
          mapR = Math.round( Math.map( bar, 0, max,      170/2, 170 ));
          mapG = Math.round( Math.map( bar, max/2, max * .7, 100, 100/2 ));
          mapB = Math.round( Math.map( bar, 0, max * .7, 50/2, 50 ));
          mapA = Math.map( bar, 0, max, 0.5, 1 );

          this.ctx.drawLine({
            color: "rgba( " + mapR + ", " + mapG + ", " + mapB + ", " + mapA + ")",
            lineWidth: 1 * r,
            from: [ this.width * (i + 1) / ( this.size + 1 ) + this.left, this.bottom - 50 * r ],
            to: [ this.width * (i + 1) / ( this.size + 1 ) + this.left, this.bottom - 50 * r - bar ]
          });
       }
      },
};

})(jQuery);