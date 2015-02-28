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

  function display(inAnim) {
    anim_played = inAnim;
    player.src = anim_played.data[0][1];
  }

/*  function play() {
    player.src = anim_played.data[i][1];
    i++;
    if( i < anim_played.data.length ){
      timeoutID = window.setTimeout( play, 500 );
    }
  }
  function stop() {
    window.clearTimeout(timeoutID);
    player.src = anim_played.data[0][1];
    i = 1;
  }
  function pause() {
    window.clearTimeout(timeoutID);
  }*/

  //   for (i = 0; i < anim_played.data.length; i++) {
  //     var a = anim_played.data[i][1];
  //     timeoutID = window.setTimeout(__next, 500, a);
  //   };
  // }

  /*function __next(inPhoto) {
    console.log("display", inPhoto);
    player.src = inPhoto;
    return true;
  }*/

  return {
    take_photo_clicked: ev_take_photo_clicked,
    back_to_list:       ev_back_to_list,

    display:  display,
    /*play:     play,
    stop:     stop,
    pause:    pause*/
  };
}();
