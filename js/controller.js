/*jshint browser: true, strict: true, devel: true */
/* exported Controller */
/* global DB, Animation, Animations, UserMedia, AnimationsView, EditorView */

var Controller = function() {
  "use strict";

  var current_anim = {},
      nb           = 0,
      // streaming    = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      // startbutton  = document.querySelector('#btn-take'),
      // width        = 640,
      width        = 320, //Flame
      // height       = width * 0.75;
      // height       = 240; // Webcam
      height       = 427; //Flame
      // height       = 480;

  var db_p2m = null;
  var AnimsModel = null;
  var AnimModel = null;
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
  db_p2m = new DB({name: DB_NAME, version: 1},[store_anim, store_config]);

  db_p2m.initiated.attach(function() {
    db_p2m.getAllStore(DB_CONFIG_STORE, function(inConfig) {
      config = inConfig;
    });
    db_p2m.getAllStore(DB_ANIMS_STORE, function(inAnims) {
      AnimsModel = new Animations(inAnims);
      AnimationsView.display(inAnims);
      AnimsModel.item_added.attach(function(items) {
        AnimationsView.display(items);
      });
      AnimsModel.item_removed.attach(function(items) {
        AnimationsView.display(items);
      });
      /*xdeck.showCard(3);
      EditorView.display(inAnims);*/
    });
  
  });

  db_p2m.error.attach(function(inError) {
    console.error("DB Error", inError);
  });

  AnimationsView.list_modified.attach(function(sender, args) {
    // updateSelected(args.index);
    AnimsModel.setSelected(args.index);
  });
  AnimationsView.new_clicked.attach(function() {
    // addItem();
    Camera = new UserMedia({
      video_container: document.getElementById("video"),
      photo_container: document.getElementById("photo"),
      canvas: document.getElementById("canvas"),
      take_btn: document.getElementById("btn-take")
    });
    AnimModel = new Animation();
    console.log("un nouveau !");
    xdeck.showCard(2);
  });

/*  function __initiateSuccess(inEvent) {
    DB.getConfig(__getConfigSuccess, __getConfigError);
    DB.getAnimations(__getAnimationsSuccess, __getAnimationsError);
  }
  function __getAnimationsSuccess(inAnimations) {
    HomeView.display(inAnimations, __displayAnim);
  }*/

/*  function __displayAnim(inAnim) {
    console.log("inAnim display: ", inAnim);
    // displayed_track = inAnim;
    document.querySelector('x-deck').showCard(3)
    EditorView.display(inAnim);
  }*/

/*  function __getAnimationsError(inError) {}

  function __initiateError(inEvent) {
    utils.status.show(inEvent);
  }
  function __getConfigSuccess(inSettings) {
    settings = inSettings;
    // ConfigView.update(inSettings);
  }
  function __getConfigError(inEvent) { console.log("__getConfigError ", inEvent); }
*/
/*  video.addEventListener('canplay', function(){
    if (!streaming) {
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      console.log("width x height", width + " x " + height);
      console.log(" VIDEO width x height", video.videoWidth + " x " + video.videoHeight);
      streaming = true;
    }
  }, false);*/

/*  function initiateCamera() {
    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
        current_anim = Animations.open();
        nb = 0;
      },
      function(err) {
        utils.status.show("An error occured! " + err);
      }
    );
  }*/

  function takePicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL();
    // console.log("data", data);
    photo.setAttribute('src', data);
    video.className = "transparent";
    current_anim = Animations.addPhoto([nb, data]);
    DB.updateAnimation(__updateAnimationSuccess, __updateAnimationError, current_anim);
    nb =+ 1;
  }
  function __updateAnimationSuccess() {
    console.log("YES !");
  }

  function __updateAnimationError(inError) {
    console.log("NO !", inError);
  }

  function editorPlay() {
    EditorView.play();
  }
  function editorPause() {
    EditorView.pause();
  }
  function editorStop() {
    EditorView.stop();
  }

/*  function displayAnimations() {
    DB.getAnimations(__getAnimationsSuccess, __getAnimationsError);
  }*/

  // startbutton.addEventListener('click', function(ev){
  //     takepicture();
  //   ev.preventDefault();
  // }, false);

  return {
    // init: init,
    // initiateCamera: initiateCamera,
    takePicture: takePicture,
    editorPlay: editorPlay,
    editorPause: editorPause,
    editorStop: editorStop,
    // displayAnimations: displayAnimations
  };
}();
