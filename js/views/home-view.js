"use strict"
var HomeView = function() {

  function display(inAnimations, displayAnimCallback) {
    if (inAnimations.length === 0) {
      __showEmpty()
    } else {
      var anims = [];
      anims = inAnimations;
      for (var i = anims.length - 1; i >= 0; i--) {
        __buildList(anims[i], displayAnimCallback);
        //console.log("buildList i ", i);
      }
    }
    // document.getElementById("list-spinner").className = "behind hidden";
  }

  function __showEmpty() {
    var el = document.createElement("p");
    el.className = "empty-tracks";
    el.innerHTML = "Empty tracks list.";
    document.getElementById("animations-list").appendChild(el);
  }

  function __buildList(inAnim, displayAnimCallback) {
    console.log('inAnim', inAnim.data);
    var list = document.getElementById("animations-list");
    var li = document.createElement("li");
    var lia = document.createElement("a");
    var i = document.createElement("img");
    i.src = inAnim.data[0][1];
    lia.appendChild(i);
    var p = document.createElement("p");
    p.innerHTML = inAnim.name;
    lia.appendChild(p);
    li.appendChild(lia);
    list.appendChild(li);
    lia.addEventListener("click", function(e){
      // document.querySelector('x-deck').showCard(1);
      // displayTrackCallback(inTrack);
      console.log("I want to see", inAnim);
      displayAnimCallback(inAnim);
    });
  }

  return {
    display: display
  }


}();
/*
<li>
    <a id="AN-20141123-075933">
    <img src="tmp/Rz_100.jpg" />
    <p>shopping</p>
  </a>
</li>
*/