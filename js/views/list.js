/* jshint browser: true, strict: true, devel: true */
/* exported ListView */

var ListView = function() {
  "use strict";
  var ev_list_modified = new Event(this);
  var ev_new_item_clicked = new Event(this);
  var ev_item_clicked = new Event(this);

  // attach listeners to HTML controls
  document.getElementById("animations-list").addEventListener('change',  function (e) {
    ev_list_modified.notify({
      index: e.target.selectedIndex
    });
  });
  document.getElementById("btn-list-new").addEventListener('click', function () {
    ev_new_item_clicked.notify();
  });

/*  var show = function () {
    display();
  };*/

  var display = function (items) {
    var list = document.getElementById("animations-list");
    list.innerHTML = "";
    if (items.length === 0) {
      var p = document.createElement("p");
      p.id = "empty-anims";
      p.innerHTML = "No animations yet!";
      list.appendChild(p);
    } else {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var li = document.createElement("li");
        var a = document.createElement("a");
        var img = document.createElement("img");
        img.src = item.data[0][1];
        a.appendChild(img);
        var pp = document.createElement("p");
        pp.innerHTML = item.name;
        a.appendChild(pp);
        li.appendChild(a);
        list.appendChild(li);
        a.addEventListener("click", function() {
          console.log("animation clicked", item);
          ev_item_clicked.notify(item);
        });
      }
    }
  };
  return {
    list_modified:    ev_list_modified,
    new_item_clicked: ev_new_item_clicked,
    item_clicked:     ev_item_clicked,
    // show:           show,
    display:        display
  };
/*  var list = document.getElementById("animations-list");
  var ev_anim_clicked = new Event(this);
  var ev_new_clicked = new Event(this);
  var display = function(inAnims) {
    if (inAnims.length === 0) {
      var p = document.createElement("p");
      p.id = "empty-anims";
      p.innerHTML = "No animations yet!";
      document.getElementById("animations-list").appendChild(p);
    } else {
      reload(inAnims);
    }
  };

  var reload = function(inAnims) {
    if (list.hasChildNodes()) {
      list.innerHTML = "";
    }
    for (var i = 0; i < inAnims.length; i++) {
      __appendAnim(inAnims[i]);
    }
  };

  var __appendAnim = function(inAnim) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var img = document.createElement("img");
    img.src = inAnim.data[0][1];
    a.appendChild(img);
    var p = document.createElement("p");
    p.innerHTML = inAnim.name;
    a.appendChild(p);
    li.appendChild(a);
    list.appendChild(li);
    a.addEventListener("click", function() {
      ev_anim_clicked.notify(inAnim);
    });
  };

  document.getElementById("btn-new").addEventListener("click", function() {
    ev_new_clicked.notify();
  });

  return {
    // events
    anim_clicked: ev_anim_clicked,
    new_clicked:  ev_new_clicked,
    // functions
    display:  display,
    reload:   reload
  };*/
}();
