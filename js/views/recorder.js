/* jshint strict: true, browser: true, devel: true */
/* exported Recorder */

var Recorder = function() {
  "use strict";
  var anim_played;
      // timeoutID;
  var player = document.getElementById("video-player");
  // var i = 1;

  var ev_take_photo_clicked = new Event(this);
  var ev_back_to_list = new Event(this);

  document.getElementById("btn-recorder-take-photo").addEventListener("click", function() {
    console.log("take_photo_clicked");
    ev_take_photo_clicked.notify();
  });
  document.getElementById("btn-recorder-back-to-list").addEventListener ("click", function() {
    ev_back_to_list.notify();
  });

  var display = function(inAnim) {
    anim_played = inAnim;
    player.src = anim_played.data[0][1];
  };

  var updateBackendPhoto = function(inPhoto) {
    document.getElementById("photo").src = inPhoto;
    document.getElementById("video").className = "transparent";
  };

  return {
    take_photo_clicked: ev_take_photo_clicked,
    back_to_list:       ev_back_to_list,

    display:  display,
    updateBackendPhoto: updateBackendPhoto
    /*play:     play,
    stop:     stop,
    pause:    pause*/
  };
}();
