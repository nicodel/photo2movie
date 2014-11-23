"use strict"
var Controller = function() {

  var streaming    = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#btn-take'),
      width        = 320,
      // height       = width * 0.75;
      height       = 240;

  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);

  function init() {
    DB.initiate(__initiateSuccess, __initiateError);

    // navigator.getMedia(
    //   {
    //     video: true,
    //     audio: false
    //   },
    //   function(stream) {
    //     if (navigator.mozGetUserMedia) {
    //       video.mozSrcObject = stream;
    //     } else {
    //       var vendorURL = window.URL || window.webkitURL;
    //       video.src = vendorURL.createObjectURL(stream);
    //     }
    //     video.play();
    //   },
    //   function(err) {
    //     utils.status.show("An error occured! " + err);
    //   }
    // );
  }

  function __initiateSuccess(inEvent) {
    DB.getConfig(__getConfigSuccess, __getConfigError);
  }
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
    console.log("data", data);
    photo.setAttribute('src', data);
    video.className = "transparent";
  }

  // startbutton.addEventListener('click', function(ev){
  //     takepicture();
  //   ev.preventDefault();
  // }, false);


  return {
    init: init,
    initiateCamera: initiateCamera,
    takePicture: takePicture
  }
}();
