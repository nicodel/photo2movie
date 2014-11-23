"use strict"
var Animations = function() {

  var current_anim = {};

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
  }

}();