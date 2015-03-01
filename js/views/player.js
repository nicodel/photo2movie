/* jshint strict: true, devel: true, browser: true */
/* exported Player */

var Player = function() {
  "use strict";

  var ev_back_to      = new Event(this);
  var ev_play         = new Event(this);
  var ev_pause        = new Event(this);
  var ev_stop         = new Event(this);
  var ev_edit_motion  = new Event(this);

  document.getElementById("btn-player-back").addEventListener("click", function() {
    ev_back_to.notify();
  });
  document.getElementById("btn-player-play").addEventListener("click", function() {
    ev_play.notify();
  });
  document.getElementById("btn-player-pause").addEventListener("click", function() {
    ev_pause.motify();
  });
  document.getElementById("btn-player-stop").addEventListener("click", function() {
    ev_stop.notify();
  });
  document.getElementById("btn-player-stop").addEventListener("click", function() {
    ev_edit_motion();
  });

  var load = function(inMotion) {
    document.getElementById("motion-title").innerHTML = inMotion.name;
    document.getElementById("video-player").src = inMotion.data[0][1];
  };

  return {
    back_to:      ev_back_to,
    play:         ev_play,
    pause:        ev_pause,
    stop:         ev_stop,
    edit_motion:  ev_edit_motion,

    load:         load
  };
}();
