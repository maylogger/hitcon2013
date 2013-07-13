(function($){
var ns = "Terminal";

window[ns] = function( options ) {
  $.extend( this, options );
  this.prepare();
};

window[ns].prototype = {
  prepare: function() {
    var time    = new Date(),
        today   = time.getDate(),
        tomonth = time.getMonth()+1,
        hour    = time.getHours(),
        minute  = time.getMinutes(),
        second  = time.getSeconds();

    this.stringsBase = [
      [
        "./hydra -l username1 -p password1 -vV -f www.hitcon.org/2013/ ftp",
        "Hydra v7.4.1 (c)2013 by van Hauser/THC & David Maciejak - for legal purposes only",
        "Hydra (http://www.thc.org/thc-hydra) starting at 2013-"+ tomonth +"-"+ today +" " + hour+ ":"+ minute +":"+ second,
        "[VERBOSE] More tasks defined than login/pass pairs exist. Tasks reduced to 1."
      ],
      [
        "[DATA] 1 task, 1 server, 1 login try (l:1/p:1), ~1 try per task",
        "[DATA] attacking service ftp on port 21",
        "[VERBOSE] Resolving addresses ... done"
      ],
      [
        "[ATTEMPT] target www.hitcon.org/2013/ - login \"username1\" - pass \"password1\" - 1 of 1 [child 0]",
        "[21][ftp] host: 200.200.240.240   login: username1   password: password1",
        "[STATUS] attack finished for www.hitcon.org/2013/ (valid pair found)",
        "1 of 1 target successfully completed, 1 valid password found",
      ],
      [
        "./hydra -l test -p test -vV -f browserspy.dk http-get /password-ok.php"
      ],
      [
        "Hydra v7.4.1 (c)2013 by van Hauser/THC & David Maciejak - for legal purposes only",
        "[VERBOSE] More tasks defined than login/pass pairs exist. Tasks reduced to 1.",
        "[DATA] 1 task, 1 server, 1 login try (l:1/p:1), ~1 try per task",
        "[DATA] attacking service http-get on port 80",
        "[VERBOSE] Resolving addresses ... done"
      ]
    ];

    this.strings = [];
  },

  getRandomString: function() {
    return this.stringsBase[ Math.floor( Math.Random(0, this.stringsBase.length) ) ];
  },

  animate: function() {
    this.update();
    this.draw();
  },

  update: function() {
    this.updateString();
  },

      updateString: function() {
        if( site.frameCount % 5 != 0 ) return;
        if( this.is_limit() ) this.strings.shift();
        else this.strings.push( this.getRandomString() );
      },

  draw: function() {
    this.drawString();
  },
      drawString: function() {
        this.ctx.font = "normal " + 4 * r + "px 'helvetica', 'arial', sans-serif";
        this.ctx.fillStyle = "#5795a1";

        var i, j, length = 0;
        for( i = 0 ; i < this.strings.length ; i ++ ) {
          for( j = 0 ; j < this.strings[i].length ; j ++ ) {
            this.ctx.fillText( this.strings[i][j], 0, length * 6 * r );
            length ++;
          }
        }
      },

  is_limit: function() {
    return this.getStringsLength() > 15;
  },

  getStringsLength: function() {
    var length = 0;
    var i, j;
    for( i = 0; i < this.strings.length ; i ++ ) {
      for( j = 0; j < this.strings[i].length ; j ++ ) {
        length++;
      }
    }
    return length;
  },
};

})(jQuery);