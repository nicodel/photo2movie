/* jshint browser: true, strict: true, devel: true */
/* exported Animation */

var Animation = function(inAnim) {
  "use strict";

  var Anim;

  var ev_new_created = new Event(this);
  var ev_take_photo_clicked = new Event(this);
  var ev_photo_added = new Event(this);
  var ev_photo_removed = new Event(this);
  var ev_updated = new Event(this);

  if (!inAnim) {
    Anim = {};
    var d = new Date();
    Anim.date = d.toISOString();
    Anim.id = Anim.date;
    Anim.name = "AN-" + Anim.date;
    Anim.image_sec = 30;
    Anim.data = [];
  } else {
    Anim = inAnim;
  }
  console.log("Anim", Anim);

  var addPhoto = function(inPhoto) {
    Anim.data.push(inPhoto);
    console.log("Anim", Anim);
    ev_photo_added.notify({anim:Anim});
  };

  var removePhoto = function() {};

  var rename = function() {};

  return {
    new_created:        ev_new_created,
    take_photo_clicked: ev_take_photo_clicked,
    photo_added:        ev_photo_added,
    photo_removed:      ev_photo_removed,
    updated:            ev_updated,

    addPhoto:     addPhoto,
    removePhoto:  removePhoto,
    rename:       rename
  };

/*  var current_anim = {};
  function open() {
    current_anim = {};
    var d = new Date();
    current_anim.date = d.toISOString();
    current_anim.id = current_anim.date;
    current_anim.name = "AN-" + current_anim.date;
    current_anim.image_sec = 30;
    current_anim.data = [];
    return current_anim;
  }
  function addPhoto(inPhoto) {
    current_anim.data.push(inPhoto);
    return current_anim;
  }
  return {
    open: open,
    addPhoto: addPhoto
  };*/

/*  var anim;
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
  };
  return {
    display:  display,
    play:     play,
    pause:    pause,
    stop:     stop
  };*/
};
