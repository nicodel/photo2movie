"use strict"
var p2m = function() {
  document.addEventListener('DOMComponentsLoaded', function(){
    document.querySelector('x-deck').showCard(2);
    Controller.init()
  });
 
}();
