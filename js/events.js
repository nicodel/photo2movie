"use strict;"

/******************
 * EVENT LISTENER *
*******************/

/*----------------- Home View -----------------*/
/* Home View new button */
// document.querySelector("#btn-new").addEventListener ("click", function () {
document.getElementById("btn-new").addEventListener ("click", function() {
  console.log("NEW");
  Controller.initiateCamera();
  document.querySelector('x-deck').showCard(2);
});

/* Home View settings button */
document.getElementById("btn-settings").addEventListener ("click", function() {
  console.log("SETTINGS");
  document.querySelector('x-deck').showCard(1);
});

/*----------------- Record View -----------------*/
/* Record View exit button */
document.getElementById("btn-exit").addEventListener ("click", function() {
  console.log("EXIT");
  Controller.displayAnimations();
  document.querySelector('x-deck').showCard(0);
});
/* Record View take button */
document.getElementById("btn-take").addEventListener ("click", function(ev) {
  console.log("TAKE");
  Controller.takePicture();
  ev.preventDefault();
}, false);
/* Record View open button */
document.getElementById("btn-open-recording").addEventListener ("click", function() {
  console.log("OPEN");
  // document.querySelector('x-deck').showCard(0);
});

/*----------------- Player View -----------------*/
/* Player View play button */
document.getElementById("btn-play").addEventListener ("click", function() {
  console.log("PLAY");
  Controller.editorPlay();
});
/* Player View play button */
document.getElementById("btn-pause").addEventListener ("click", function() {
  console.log("PAUSE");
  Controller.editorPause();
});
/* Player View stop button */
document.getElementById("btn-stop").addEventListener ("click", function() {
  console.log("STOP");
  Controller.editorStop();
});
/* Player View back button */
document.getElementById("btn-back-player").addEventListener ("click", function() {
  document.querySelector('x-deck').showCard(0);
});