"use strict"
var Controller = function() {

  var current_anim = {},
      nb           = 0,
      streaming    = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#btn-take'),
      width        = 640,
      // width        = 320, //Flame
      // height       = width * 0.75;
      // height       = 240; // Webcam
      // height       = 427; //Flame
      height       = 480;

  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);

  function init() {
    DB.initiate(__initiateSuccess, __initiateError);
  }

  function __initiateSuccess(inEvent) {
    DB.getConfig(__getConfigSuccess, __getConfigError);
    DB.getAnimations(__getAnimationsSuccess, __getAnimationsError);
  }
  function __getAnimationsSuccess(inAnimations) {
    HomeView.display(inAnimations, __displayAnim);
  }

  function __displayAnim(inAnim) {
    console.log("inAnim display: ", inAnim);
    // displayed_track = inAnim;
    document.querySelector('x-deck').showCard(3)
    EditorView.display(inAnim);
  }

  function __getAnimationsError(inError) {}

  function __initiateError(inEvent) {
    utils.status.show(inEvent);
  }
  function __getConfigSuccess(inSettings) {
    settings = inSettings;
    // ConfigView.update(inSettings);
  }
  function __getConfigError(inEvent) { console.log("__getConfigError ", inEvent); }

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      console.log("width x height", width + " x " + height);
      console.log(" VIDEO width x height", video.videoWidth + " x " + video.videoHeight);
      streaming = true;
    }
  }, false);

  function initiateCamera() {
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
  }

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

  function displayAnimations() {
    DB.getAnimations(__getAnimationsSuccess, __getAnimationsError);
  }

  // startbutton.addEventListener('click', function(ev){
  //     takepicture();
  //   ev.preventDefault();
  // }, false);

  return {
    init: init,
    initiateCamera: initiateCamera,
    takePicture: takePicture,
    editorPlay: editorPlay,
    editorPause: editorPause,
    editorStop: editorStop,
    displayAnimations: displayAnimations
  }
}();
