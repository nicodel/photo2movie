"use strict"
var EditorView = function() {
  var anim_played,
      timeoutID;
  var player = document.getElementById("video-player");
  var i = 1;

  function display(inAnim) {
    anim_played = inAnim;
    player.src = anim_played.data[0][1];
  }

  function play() {
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
  }

  //   for (i = 0; i < anim_played.data.length; i++) {
  //     var a = anim_played.data[i][1];
  //     timeoutID = window.setTimeout(__next, 500, a);
  //   };
  // }

  function __next(inPhoto) {
    console.log("display", inPhoto);
    player.src = inPhoto;
    return true;
  }

  return {
    display: display,
    play: play,
    stop: stop,
    pause: pause
  }
}();