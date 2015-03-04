/* jshint browser: true, strict: true, devel: true */
/* exported Motion */

var Motion = function(inMotion) {
  "use strict";

  var motion;

  var ev_new_created = new Event(this);
  var ev_take_photo_clicked = new Event(this);
  var ev_photo_added = new Event(this);
  var ev_photo_removed = new Event(this);
  var ev_updated = new Event(this);

  if (!inMotion) {
    motion = {};
    var d = new Date();
    motion.date = d.toISOString();
    motion.id = motion.date;
    motion.name = "AN-" + motion.date;
    motion.image_sec = 30;
    motion.data = [];
  } else {
    motion = inMotion;
  }
  console.log("motion", motion);

  var addPhoto = function(inPhoto) {
    motion.data.push(inPhoto);
    ev_photo_added.notify({anim:motion});
  };

  var removePhoto = function() {};

  var rename = function() {};

  var load = function(inMotion) {
    motion = inMotion;
  };

  return {
    new_created:        ev_new_created,
    take_photo_clicked: ev_take_photo_clicked,
    photo_added:        ev_photo_added,
    photo_removed:      ev_photo_removed,
    updated:            ev_updated,

    addPhoto:     addPhoto,
    removePhoto:  removePhoto,
    rename:       rename,
    load:         load
  };
};
