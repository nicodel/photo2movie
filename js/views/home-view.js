"use strict"
var HomeView = function() {

  function display(inAnimations, displayAnimCallback) {
    if (inAnimations.length === 0) {
      __showEmpty()
    } else {
      reset();
      var anims = [];
      anims = inAnimations;
      for (var i = anims.length - 1; i >= 0; i--) {
        __buildList(anims[i], displayAnimCallback);
        //console.log("buildList i ", i);
      }
    }
    // document.getElementById("list-spinner").className = "behind hidden";
  }

  function reset() {
    if (document.getElementById("animations-list").hasChildNodes()) {
      __remove_childs("animations-list");
      if (document.getElementById("empty-anims")) {
        document.getElementById("empty-anims").remove();
      }
      // var li = document.createElement("li");
      // li.className = "ontop";
      // li.id = "list-spinner"
      // var div = '<div class="align-center top40"><progress id="spinner"></progress></div>';
      // li.innerHTML = div;
      // document.getElementById("animations-list").appendChild(li);
    };
  }
  function __remove_childs(parent) {
    var d = document.getElementById(parent).childNodes;
    console.log("d",d);
    for (var i = 0; i = d.length - 1; i++) {
      console.log("remove element " + i + " " + d[i]);
      document.getElementById(parent).removeChild(d[i]);
    }
  }

  function __showEmpty() {
    var el = document.createElement("p");
    el.id = "empty-anims";
    el.innerHTML = "No Animations yet !";
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

  Element.prototype.remove = function() {
      this.parentElement.removeChild(this);
  }
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
      for(var i = 0, len = this.length; i < len; i++) {
          if(this[i] && this[i].parentElement) {
              this[i].parentElement.removeChild(this[i]);
          }
      }
  }

  return {
    display: display,
    reset: reset
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