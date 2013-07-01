(function($){
var ns = "Site";

window[ns] = function() {
};

window[ns].prototype = {
  setup: function() {
    this.init();
    this.prepare();
    this.animate();
  },

  init: function() {
    this.window     = $( window );
    this.document   = $( document );
    this.body       = $('body');
    this.frameCount = 0;

    this.subtitleStyle = "#d2cd7c";
    $.ajaxSetup({
      cache: true
    });
  },

  prepare: function() {
    this.heros       = [];
    this.animators   = [];
    this.callbacks   = {};
    this.globalIndex = {};
    
    var obj = this.body.find('.obj'),
        wrapper,
        type,
        className,
        index;
    
    obj.each(function( i, dom ){
      wrapper = $(dom);

      if( type == wrapper.attr('data-type') ) index ++;
      else index = 0;
      type = wrapper.attr('data-type');

      if( typeof this.globalIndex[type] != 'number' ) this.globalIndex[type] = 0;
      else this.globalIndex[type] ++;

      this.heros.push( new Hero({ type: type, wrapper: wrapper, index: index, globalIndex: this.globalIndex[type] }) );
    }.bind(this));
  },

  animate: function() {
    this.heros.do('clear');
    this.animators.do('animate');
    this.frameCount++;
    requestAnimFrame( this.animate.bind(this) );
  },
};

})(jQuery);