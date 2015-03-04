/* jshint strict: true, browser: true, devel: true */
/* exported Editor */

var Editor = function() {
  "use strict";

  var motion    = null;
  var i         = 1;
  var timeoutId  = null;

  var ev_back_to = new Event(this);

  document.getElementById("btn-editor-back").addEventListener("click", function() {
    ev_back_to.notify();
  });
  document.getElementById("btn-editor-play").addEventListener("click", function() {
    __play();
  });
  document.getElementById("btn-editor-pause").addEventListener("click", function() {
    __pause();
  });
  document.getElementById("btn-editor-stop").addEventListener("click", function() {
    __stop();
  });

  var load = function(inMotion) {
    motion = inMotion;
    document.getElementById("editor-motion-title").innerHTML = motion.name;
    document.getElementById("editor-video-player").src = motion.data[0][1];
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
    back_to:  ev_back_to,

    load:     load
  };
}();
