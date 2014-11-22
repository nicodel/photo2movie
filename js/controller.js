"use strict"
var Controller = function() {
  var video = document.querySelector('#video'),
      cover = document.querySelector('#cover'),
      canvas = document.querySelector('#canvas'),
      vidcontainer = document.querySelector('#videocontainer');

 function init() {
    navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
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
          video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
        }
      video.play();
      video.style.width = width + 'px';
      video.style.height = height + 'px';
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  }

  return {
    init: init
  };

}();
