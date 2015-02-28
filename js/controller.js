/*jshint browser: true, strict: true, devel: true */
/* exported Controller */
/* global DB, Motion, List, UserMedia, ListView, Recorder */

var Controller = function() {
  "use strict";

  var current_anim = {};
  var nb           = 0;
      // streaming    = false,
      // video        = document.querySelector('#video'),
      // canvas       = document.querySelector('#canvas'),
      // photo        = document.querySelector('#photo'),
      // startbutton  = document.querySelector('#btn-take'),
      // width        = 640,
      // width        = 320, //Flame
      // height       = width * 0.75;
      // height       = 240; // Webcam
      // height       = 427; //Flame
      // height       = 480;

  var db_p2m = null;
  var AnimsModel = null;
  var Motion = null;
  var Camera = null;

  var DB_NAME = "p2m";
  var DB_CONFIG_STORE = "settings";
  var DB_ANIMS_STORE = "animations";
  var config;
  var xdeck = document.querySelector("x-deck");

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
  var index_anim = [{name: "animid", key: "animid", unique: true}];
  var store_anim = {
    name: DB_ANIMS_STORE,
    key: "id",
    increment: true,
    index: index_anim
  };

  /*
   * Database
   */
  db_p2m = new DB({name: DB_NAME, version: 1},[store_anim, store_config]);

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
    Motion = new Motion();
    console.log("un nouveau !");
    xdeck.showCard(2);

    Camera = new UserMedia({
      video_container: document.getElementById("video"),
      // photo_container: document.getElementById("photo"),
      canvas: document.getElementById("canvas")
      // take_btn: document.getElementById("btn-recorder-take-photo")
    });
    Camera.photo_taken.attach(function(sender, data) {
      Motion.addPhoto([nb, data]);
      current_anim = Motion.addPhoto([nb, data]);
      db_p2m.updateItem(current_anim, DB_ANIMS_STORE);
      nb =+ 1;
    });

    Motion.photo_added.attach(function(sender, args) {
      console.log("args.anim", args.anim);
      db_p2m.updateItem(args.anim, DB_ANIMS_STORE);
    });
  });

  ListView.item_clicked.attach(function(sender, args) {
    console.log("clicked on", args);
    xdeck.showCard(3);
  });


/*  function takePicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL();
    // console.log("data", data);
    photo.setAttribute('src', data);
    video.className = "transparent";
    current_anim = Animations.addPhoto([nb, data]);
    // DB.updateAnimation(__updateAnimationSuccess, __updateAnimationError, current_anim);
    db_p2m.updateItem(current_anim, DB_ANIMS_STORE);
    nb =+ 1;
  }*/
  /*function editorPlay() {
    Recorder.play();
  }
  function editorPause() {
    Recorder.pause();
  }
  function editorStop() {
    Recorder.stop();
  }*/

  /*
   * Recorder
   */
  Recorder.take_photo_clicked.attach(function() {
    console.log("controller take_photo_clicked");
    Camera.takePhoto();
  });
  Recorder.back_to_list.attach(function() {
    console.log("exit editor view");
    __getAllAnimations();
    // AnimsModel.addItem(current_anim);
    xdeck.showCard(0);
  });

  function __getAllAnimations() {
    db_p2m.getAllStore(DB_ANIMS_STORE, function(inAnims) {
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

/*  function displayAnimations() {
    DB.getAnimations(__getAnimationsSuccess, __getAnimationsError);
  }*/

  return {
    // init: init,
    // initiateCamera: initiateCamera,
    // takePicture: takePicture,
    /*editorPlay: editorPlay,
    editorPause: editorPause,
    editorStop: editorStop,*/
    // displayAnimations: displayAnimations
  };
}();
