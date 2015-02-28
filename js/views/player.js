/* jshint strict: true, devel: true, browser: true */
/* exported Player */

var Player = function() {
  "use strict";

  var ev_exit = new Event(this);
  var ev_play = new Event(this);
  var ev_pause = new Event(this);
  var ev_stop = new Event(this);

  document.getElementById("btn-player-back").addEventListener("click", function() {});
  document.getElementById("btn-player-play").addEventListener("click", function() {});
  document.getElementById("btn-player-pause").addEventListener("click", function() {});
  document.getElementById("btn-player-stop").addEventListener("click", function() {});

  return {
    exit:   ev_exit,
    play:   ev_play,
    pause:  ev_pause,
    stop:   ev_stop
  };
}();
