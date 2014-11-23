"use strict"
var p2m = function() {
  document.addEventListener('DOMComponentsLoaded', function(){
    document.querySelector('x-deck').showCard(0);
    Controller.init();
  });
}();