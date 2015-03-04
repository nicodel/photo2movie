/* jshint strict: true, devel: true, browser: true */
/* exported Player */

var Player = function() {
  "use strict";

  var motion = null;
  var i = 1;
  var timeoutId = null;

  var ev_back_to      = new Event(this);
  var ev_edit_motion  = new Event(this);

  document.getElementById("btn-player-back").addEventListener("click", function() {
    ev_back_to.notify();
  });
  document.getElementById("btn-player-play").addEventListener("click", function() {
    __play();
  });
  document.getElementById("btn-player-pause").addEventListener("click", function() {
    __pause();
  });
  document.getElementById("btn-player-stop").addEventListener("click", function() {
    __stop();
  });
  document.getElementById("btn-player-stop").addEventListener("click", function() {
    ev_edit_motion();
  });

  var load = function(inMotion) {
    motion = inMotion;
    document.getElementById("motion-title").innerHTML = motion.name;
    document.getElementById("video-player").src = motion.data[0][1];
    console.log("motion to be played", motion);
  };

  var __play = function() {
    document.getElementById("video-player").src = motion.data[i][1];
    i++;
    if (i <  motion.data.length) {
      timeoutId = window.setTimeout(__play, 500);
    } else {
      __stop();
    }
  };
  var __pause = function() {
    window.clearTimeout(timeoutId);
  };
  var __stop = function() {
    window.clearTimeout(timeoutId);
    document.getElementById("video-player").src = motion.data[0][1];
    i = 1;
  };

  return {
    back_to:      ev_back_to,
    edit_motion:  ev_edit_motion,

    load:         load
  };
}();
