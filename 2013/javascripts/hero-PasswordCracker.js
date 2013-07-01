(function($){
var ns = "PasswordCracker";
// xx( 'a' );
window[ns] = function( options ) {
  $.extend( this, options );
  this.init();
};

window[ns].prototype = {
  init: function() {
    this.startPoint = {
      x: (75+100)/2 * r,
      y: 18.5 * r
    };

    this.arrowRate = 2*r;
    this.arrowPoints = [
      { x: 0 * this.arrowRate, y: 0 * this.arrowRate },
      { x: 2 * this.arrowRate, y: 0 * this.arrowRate },
      { x: 1 * this.arrowRate, y: 2 * this.arrowRate }
    ];
    

    this.x         = this.startPoint.x;
    this.y         = this.startPoint.y;
    this.completeX = this.width - (25/2) * r;
    this.complete  = false;
    this.length    = this.completeX - this.x;

    this.progressStyle   = "rgb(170, 0, 50)";
    this.uncompleteStyle = "#2a3752";
    this.completeStyle   = "#465980";
    this.GPUStyle        = "rgb(60, 130, 150)";
    this.backboneStyle   = "rgba(255, 255, 255, .5)";
    this.intervalStyle   = "rgba(255, 255, 255,  1)";
    
    this.step = (this.width/r) / 25;
  },

  animate: function() {
    this.update();
    this.draw();
  },

  update: function() {
    if( this.complete ) return;
    if( this.is_complete() ) {
      this.complete = true;
      setTimeout(function(){
        this.reset();
      }.bind(this), 2000);
      return ;
    }
    if( Math.random() < .1 ) this.x += Math.Random( 0, 30 );
  },

      reset: function() {
        this.x        = this.startPoint.x;
        this.complete = false;
      },

  draw: function() {
    this.drawNumber();
    if( this.complete ) {
      this.drawCompeleMessage();
    } else {
      this.drawProcessing();
      this.drawWholeBar();
      this.drawArrow();
    }
  },

      drawArrow: function() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#50ae8b';
        this.ctx.moveTo( this.arrowPoints[0].x , this.arrowPoints[0].y );
        this.ctx.lineTo( this.arrowPoints[1].x , this.arrowPoints[1].y );
        this.ctx.lineTo( this.arrowPoints[2].x , this.arrowPoints[2].y );
        this.ctx.lineTo( this.arrowPoints[0].x , this.arrowPoints[0].y );
        this.ctx.fill();
      },

      drawNumber: function() {
        this.ctx.beginPath();
        this.ctx.font      = "normal " + (20 * r) + "px 'TungstenMedium', sans-serif";
        this.ctx.textAlign = "left";
        
        this.ctx.fillStyle = this.GPUStyle;
        this.ctx.fillText( "HD7990", 12 * r, 20 * r );

        this.ctx.fillStyle = this.complete ? site.subtitleStyle : this.uncompleteStyle;
        this.ctx.fillText( (this.index < 9 ? "0" : "") + (this.index + 1), 61 * r, 20 * r );
      },

      drawCompeleMessage: function() {
        this.ctx.beginPath();
        this.ctx.font      = "normal " + (15 * r) + "px 'TungstenMedium', sans-serif";
        this.ctx.fillStyle = this.completeStyle;
        this.ctx.textAlign = "right";
        this.ctx.fillText( "Cracked", this.completeX, 20 * r );
      },

      drawProcessing: function() {
        this.ctx.drawLine({
          color: this.progressStyle,
          lineWidth: 2*r,
          from: [ this.startPoint.x + 2, this.y ],
          to: [ this.x + 1 * r, this.y ]
        })
      },

      drawWholeBar: function() {
        // backbone
        this.ctx.drawLine({
          color: this.backboneStyle,
          lineWidth: .5 * r,
          from: [ this.startPoint.x, this.y ],
          to: [ this.completeX, this.y ]
        });


        // // head and tail
        this.ctx.drawLines({
          color: this.intervalStyle,
          pathes: [
            { 
              from: [ this.startPoint.x - .5 * r, this.y - 4.5 * r ], 
              to: [ this.startPoint.x - .5 * r, this.y + 1.5 * r ]
            },
            {
              from: [ this.startPoint.x + this.length, this.y - 4.5 * r ],
              to: [ this.startPoint.x + this.length, this.y + 1.5 * r ]
            }
          ]
        });

        // interval
        this.ctx.beginPath();
        for( var i = 1 ; i < this.step + 1 ; i ++ ) {
          this.ctx.moveTo( this.startPoint.x + this.length/(this.step + 1) * i, this.y - (i == this.step-2 ? 4.5 : .5) * r );
          this.ctx.lineTo( this.startPoint.x + this.length/(this.step + 1) * i, this.y + (i == this.step-2 ? 1.5 : .5) * r );
        }
        this.ctx.stroke();
      },

  is_complete: function() {
    return this.x >= this.completeX - 25/2*r;
  },
};

})(jQuery);