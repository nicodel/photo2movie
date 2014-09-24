(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      player       = document.querySelector('#player'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width        = 320,
      height       = 0;

  var encoder      = new Whammy.Video(15);

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
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    var h = video.videoHeight / (video.videoWidth / width);
    canvas.width = width;
    canvas.height = h;
    canvas.getContext('2d').drawImage(video, 0, 0, width, h);
    var data = canvas.toDataURL('image/jpeg');
    console.log('data', data);
    photo.setAttribute('src', data);
    encoder.add(canvas.getContext("2d"));
  }

  function playmovie() {
    var output = encoder.compile();
    player.src = (window.webkitURL || window.URL).createObjectURl(output);

  }

  startbutton.addEventListener('click', function(ev){
  	takepicture();
    ev.preventDefault();
  }, false);

  playbutton.addEventListener('click', function(ev){
  	playmovie();
    ev.preventDefault();
  }, false);


})();
