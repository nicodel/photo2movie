/*jshint browser: true, strict: true, devel: true */
/* exported Controller */
/* global DB, Motion, List, UserMedia, ListView, Recorder, Player, Editor */

var Controller = function() {
  "use strict";

  var nb                = 0;
  var db_p2m            = null;
  var AnimsModel        = null;
  var MoTion            = null;
  var Camera            = null;
  var previous_edition  = "list";
  var edited_motion     = null;

  var DB_NAME           = "p2m";
  var DB_CONFIG_STORE   = "settings";
  var DB_MOTIONS_STORE  = "motions";
  var config            = null;
  var xdeck             = document.querySelector("x-deck");

  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);

  var index_config = [
      {name: "key", key: "key", unique: true},
      {name: "value", key: "value", unique: false},
    ];
  var store_config = {
    name: DB_CONFIG_STORE,
    key: "key",
    increment: false,
    index: index_config
  };
  var index_motion = [{name: "id", key: "id", unique: true}];
  var store_motion = {
    name: DB_MOTIONS_STORE,
    key: "id",
    increment: true,
    index: index_motion
  };

  /*********************************************
   * Database
   *********************************************/
  db_p2m = new DB({name: DB_NAME, version: 1},[store_motion, store_config]);

  db_p2m.initiated.attach(function() {
    db_p2m.getAllStore(DB_CONFIG_STORE, function(inConfig) {
      config = inConfig;
    });
    __getAllAnimations();
  });

  db_p2m.error.attach(function(inError) {
    console.error("DB Error", inError);
  });

  ListView.list_modified.attach(function(sender, args) {
    // updateSelected(args.index);
    AnimsModel.setSelected(args.index);
  });
  ListView.new_item_clicked.attach(function() {
    // addItem();
    MoTion = new Motion();
    console.log("un nouveau !");
    xdeck.showCard(2);
    previous_edition = "recorder";

    Camera = new UserMedia({
      video_container: document.getElementById("video"),
      canvas: document.getElementById("canvas")
    });
    Camera.photo_taken.attach(function(sender, data) {
      MoTion.addPhoto([nb, data]);
      Recorder.updateBackendPhoto(data);
      nb =+ 1;
    });

    MoTion.photo_added.attach(function(sender, args) {
      console.log("args.anim", args.anim);
      db_p2m.updateItem(args.anim, DB_MOTIONS_STORE);
    });
  });

  ListView.item_clicked.attach(function(sender, item) {
    console.log("clicked on", item);
    edited_motion = new Motion();
    edited_motion.load(item);
    Player.load(item);
    xdeck.showCard(3);
  });

  /*********************************************
   * Recorder
   *********************************************/
  Recorder.take_photo_clicked.attach(function() {
    console.log("controller take_photo_clicked");
    Camera.takePhoto();
  });
  Recorder.back_to_list.attach(function() {
    console.log("exit editor view");
    __getAllAnimations();
    // AnimsModel.addItem(current_motion);
    xdeck.showCard(0);
  });

  /*********************************************
   * Player
   *********************************************/
  Player.back_to.attach(function() {
    console.log("going back to", previous_edition);
    if (previous_edition === "recorder") {
      console.log("recorder");
      xdeck.showCard();
    } else if (previous_edition === "list") {
      console.log("list");
      xdeck.showCard(0);
    }
  });
  Player.edit_motion.attach(function(sender, items) {
    console.log("editing", items);
    Editor.load(items[0]);
    xdeck.showCard(4);
  });

  function __getAllAnimations() {
    db_p2m.getAllStore(DB_MOTIONS_STORE, function(inAnims) {
      AnimsModel = new List(inAnims);
      ListView.display(inAnims);
      AnimsModel.item_added.attach(function(items) {
        ListView.display(items);
      });
      AnimsModel.item_removed.attach(function(items) {
        ListView.display(items);
      });
    });
  }
}();
