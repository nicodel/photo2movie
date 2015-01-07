/* jshint browser: true, strict: true, devel: true */
/* exported Animations */

var Animations = function(items) {
  "use strict";
  var selectedIndex = -1;

  var ev_item_added = new Event(this);
  var ev_item_removed = new Event(this);
  var selectedIndexChanged = new Event(this);

  var getItems = function () {
    return [].concat(items);
  };

  var addItem = function (item) {
      items.push(item);
      ev_item_added.notify({
          item: item
      });
  };

  var removeItemAt = function (index) {
    var item;

    item = items[index];
    items.splice(index, 1);
    ev_item_removed.notify({
        item: item
    });
    if (index === selectedIndex) {
        setSelectedIndex(-1);
    }
  };

  var getSelectedIndex = function () {
    return selectedIndex;
  };

  var setSelectedIndex = function (index) {
    var previousIndex;

    previousIndex = selectedIndex;
    selectedIndex = index;
    selectedIndexChanged.notify({
        previous: previousIndex
    });
  };

  return {
    item_added: ev_item_added,
    item_removed: ev_item_removed,
    selectedIndexChanged: selectedIndexChanged,
    getItems: getItems,
    addItem: addItem,
    removeItemAt: removeItemAt,
    getSelectedIndex: getSelectedIndex,
    setSelectedIndex: setSelectedIndex
  };
/*  var current_anim = {};
  function open() {
    current_anim = {};
    var d = new Date();
    current_anim.date = d.toISOString();
    current_anim.id = current_anim.date;
    current_anim.name = "AN-" + current_anim.date;
    current_anim.image_sec = 30;
    current_anim.data = [];
    return current_anim;
  }
  function addPhoto(inPhoto) {
    current_anim.data.push(inPhoto);
    return current_anim;
  }
  return {
    open: open,
    addPhoto: addPhoto
  };*/

};
