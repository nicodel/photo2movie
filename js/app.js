/* jshint browser: true, strict: true, devel: true */
/* exported p2m, l10n */
/* global Controller */

var p2m = function() {
  "use strict";
  document.addEventListener('DOMComponentsLoaded', function(){
    document.querySelector('x-deck').showCard(0);
    Controller.init();
  });
}();
