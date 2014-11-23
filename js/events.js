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
  document.querySelector('x-deck').showCard(0);
});
/* Record View take button */
document.getElementById("btn-take").addEventListener ("click", function(ev) {
  console.log("TAKE");
  Controller.takePicture();
  ev.preventDefault();
}, false);
/* Record View open button */
document.getElementById("btn-open").addEventListener ("click", function() {
  console.log("OPEN");
  // document.querySelector('x-deck').showCard(0);
});