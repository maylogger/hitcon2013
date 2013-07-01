(function($){
var ns = "Map";
var r = 1;

window[ns] = function( options ) {
  $.extend( this, options );
  this.setup();
  this.loadImages();
  this.init();
};

window[ns].prototype = {
  setup: function() {
    var prefix = 'javascripts/images/';
    var surfix = is_retina ? '@2x' : '';

    this.source = [
      { url: prefix + 'dark' + surfix + '.jpg',  type: 'base' },
      { url: prefix + 'light' + surfix + '.jpg', type: 'light' }
    ];
    this.imageLoaded = 0;

    this.k  = 10;
    this.s  = 2;
  },

  reset: function() {
    this.resetK();
  },

  resetK: function() {
    this.lineOver = false;
    this.k += Math.Random(-1, 1) * 10;
    this.k = Math.round( Math.constrain( this.k, 2, 13) );
  },

      loadImages: function() {
        var i = this.source.length, source; 
        while( i-- ) {
          source = this.source[i];
          $('<img />')
            .load( function( event ){
                this.oneloaded( event );
              }.bind( this ))
            .attr('src', source.url )
            .attr('data-type', source.type );
        }
      },

      oneloaded: function( event ) {
        var target = event.currentTarget;
        var type   = target.getAttribute('data-type');

        this[type] = {
          root: target,
          width: target.width,
          height: target.height
        };

        if( this.imageLoaded == 0) this.ratio = target.width / target.height;

        this.imageLoaded++;
        if( this.imageLoaded == this.source.length ) this.load();
      },

      load: function() {
        this.loaded = true;
        this.resize();
        this.initLinePosition();
      },

  init: function() {
    this.lineStart  = 1;
    this.lineEnd    = this.height;
  },


  animate: function() {
    if( ! this.loaded ) return;
    this.update();
    this.draw();
  },

  update: function() {
    this.updateLinePosition();
    this.updateData();
    this.updateTaiwan();
  },

      updateTaiwan: function() {
        if( this.linePosition == this.center.y ) return this.tw.radius = 10;
        this.tw.radius *= 0.99;
      },

      updateLinePosition: function() {
        this.linePosition += this.s;
        if( this.linePosition >= this.lineEnd ) this.resetLinePosition();
      },
    
          initLinePosition: function() {
            this.lineStart = 1;
            this.lineEnd   = this.height;
            this.linePosition = this.lineStart;    
          },

          resetLinePosition: function() {
            this.initLinePosition();
            this.lineOver = true;
          },

      updateData: function() {
        if( this.lineOver ) this.reset();

        var light = this.light.data.data,
            point, ppoint, 
            y = this.linePosition,
            lr, lg, lb, gray,
            rate, threshold = 20;

        for( var x = 0 ; x < this.width ; x ++ ) {
          point  = ( x * this.height + y ) * 4;
          ppoint = ( x  * this.height + y - Math.Random(35, 75, true)*5 ) * 4;

          lr = light[ point ];
          lg = light[ point + 1 ];
          lb = light[ point + 2 ];
          gray = Math.avg(lr, lg, lb);

          if( gray > threshold ) rate = Math.map( gray - threshold, 0, threshold, 0.5, 1 );
          else rate = Math.Random(0, 0.5);
          // else rate = .5;

          this.data.data[ point + 0 ] = this.base.data.data[ ppoint + 0 ] * rate * 4  * this.k *.1;
          this.data.data[ point + 1 ] = this.base.data.data[ ppoint + 1 ] * rate * 7  * this.k *.1;
          this.data.data[ point + 2 ] = this.base.data.data[ ppoint + 2 ] * rate * 10 * this.k *.1;
        }
      },


  draw: function() {
    this.putMapData();
    this.drawLine();
    this.drawTaiwan();
  },

      drawTaiwan: function() {
        this.ctx.drawCircle( 0, 'rgba( 255, 0, 0, .5 )', this.tw, this.tw.radius, true );
        this.ctx.drawCircle( 0, 'rgba( 255, 0, 0, 1 )', this.tw, this.tw.radius/2, true );
      },

      putMapData: function() {
        this.ctx.putImageData( this.data, 0, 0 );
      },

      drawLine: function() {
        this.ctx.drawLine({
          from: [ 0, this.linePosition + 3 ],
          to: [ this.width, this.linePosition + 3 ],
          color: 'rgba( 255, 0, 0, .5) '
        })
      },

      clear: function() {
        this.ctx.beginPath();
        this.ctx.clearRect( 0, 0, this.width, this.height );
      },

      resetStyle: function() {
        this.ctx.strokeStyle = "rgba( 255, 150, 100, 0.2)";
      },


  resize: function() {
    this.width  = this.canvas.width  = (1400 - 2) * r;
    this.height = this.canvas.height = (600  - 2) * r;
    this.center = {
      x: this.width/2,
      y: this.height/2
    }

    this.tw = {
      x: this.center.x + 6 * r,
      y: this.center.y - 12 * r,
      radius: 0
    }

    this.resetStyle();

    if( ! this.loaded ) return;
    if( ! this.data ) {
      this.data = this.ctx.createImageData( this.width, this.height );
      for( var i = 0 ; i < this.data.data.length ; i += 4 ) {
        this.data.data[i + 3] = 255;
      }
    }
    this.getMapData();
  },

  getMapData: function() {
    var i = this.source.length, canvas, ctx, data, type, w, h;

    while( i -- ) {
      type   = this.source[i].type;
      canvas = document.createElement('canvas');
      ctx    = canvas.getContext('2d');

      w = this.width;
      h = this.height;

      canvas.width  = w;
      canvas.height = h;
      ctx.drawImage( this[type].root, 0, 0, w, h );
      data = ctx.getImageData( 0, 0, w, h );

      this[type].canvas = canvas;
      this[type].ctx    = ctx;
      this[type].data   = data;
    }
  },
};

})(jQuery);

