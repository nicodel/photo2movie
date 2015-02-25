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
      console.log("items", items);
      ev_item_added.notify({
          items: items
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
};
