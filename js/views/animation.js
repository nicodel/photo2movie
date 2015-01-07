/* jshint browser: true, strict: true, devel: true */
/* exported AnimationView */

var AnimationView = function() {
  "use strict";

  var anim;
  var timeoutID;
  var i = 1;
  var player = document.getElementById("video-player");

  var display = function(inAnim) {
    anim = inAnim;
    player.src = anim.data[0][1];
  };

  var play = function() {
    player.src = anim.data[i][1];
    i++;
    if (i < anim.data.length) {
      timeoutID = window.setTimeout(play, 500);
    }
  };

  var pause = function() {
    window.clearTimeout(timeoutID);
  };

  var stop = function() {
    window.clearTimeout(timeoutID);
    player.src = anim.data[0][1];
    i = 1;
  }

  return {
    display:  display,
    play:     play,
    pause:    pause,
    stop:     stop
  };
}();
