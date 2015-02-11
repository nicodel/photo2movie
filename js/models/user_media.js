/* jshint browser: true, strict: true, devel: true */
/* exported UserMedia */

var UserMedia = function(elements) {
  "use strict";

  var vendorURL;
  var streaming = false;

  var width = 640;
  var height = 480;

  var ev_photo_taken = new Event(this);
  var ev_error = new Event(this);

  var video = elements.video_container;
  var photo = elements.photo_container;
  var canvas = elements.canvas;
  var take_btn = elements.take_btn;

  take_btn.addEventListener("click", function() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL();
    // console.log("data", data);
    ev_photo_taken.notify(data);
    photo.setAttribute("src", data);
    video.className = "transparent";
    // current_anim = Animations.addPhoto([nb, data]);
    // DB.updateAnimation(__updateAnimationSuccess, __updateAnimationError, current_anim);
  });

  video.addEventListener("loadeddata", function() {
    var camera_w = video.videoWidth;
    var camera_h = video.videoHeight;
    console.log("Camera", camera_w + " x " + camera_h);
    var screen_w = screen.width;
    var screen_h = screen.height;
    console.log("Screen", screen_w + " x " + screen_h);
  }, false);

  video.addEventListener("canplay", function(){
    if (!streaming) {
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      // console.log("width x height", width + " x " + height);
      console.log(" VIDEO width x height", video.videoWidth + " x " + video.videoHeight);
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
    error:        ev_error
  };

};
