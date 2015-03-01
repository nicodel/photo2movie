/* jshint browser: true, strict: true, devel: true */
/* exported UserMedia */

var UserMedia = function(elements) {
  "use strict";

  var vendorURL;
  var streaming = false;

  var width = window.innerWidth;
  var height = window.innerHeight;
  console.log("sizes: w x h", width + " x " + height);

  var ev_photo_taken = new Event(this);
  var ev_error = new Event(this);

  var video = elements.video_container;
  var canvas = elements.canvas;

  var takePhoto = function() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL();
    ev_photo_taken.notify(data);
  };

  video.addEventListener("canplay", function(){
    if (!streaming) {
      video.setAttribute("height", height);
      streaming = true;
    }
  }, false);

  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUSerMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);
  navigator.getMedia({
      video: true,
      audio: false
    },function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        vendorURL = window.url || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(e) {
      ev_error.notify(e);
    }
  );

  return {
    photo_taken:  ev_photo_taken,
    error:        ev_error,

    takePhoto:    takePhoto
  };

};
