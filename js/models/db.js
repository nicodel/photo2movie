/* jshint browser: true, devel: true, strict: true */
/* exported DB */

/**
 *
 * @param {array} db_info {name: {String}, version: {Long}}
 * @param {array} stores [{name: {String},
 *                        key: {String},
 *                        increment: {Boolean},
 *                        index: [{name: {String},
 *                                key: {String},
 *                                unique: {Boolean}
 *                                },
 *                        {}]
 *                        }, {}]
 */
var DB = function(db_info, stores) {
  "use strict";

/*  if (!db_info || !stores) {
    ev_error.notify("Set parameters: db_info and stores");
  } else if (!db_info.name) {
    ev_error.notify("Set db_info.name");
  } else if (!db_info.version || !Number.isInteger(db_info.version)) {
    ev_error.notify("db_info.version should be an Integer");
  } else {
    __initiate();
  }*/

  var db;

  var ev_initiated = new Event(this);
  var ev_error = new Event(this);
  var ev_item_added = new Event(this);
  var ev_item_removed = new Event(this);
  var ev_item_updated = new Event(this);

  /**
   * Reset the whole IndexedDB database
   */
/*  var delreq = window.indexedDB.deleteDatabase(db_info.name);
  delreq.onerror = function(e) {
    console("reset error: ", e.error.name);
  };
  delreq.onsuccess = function() {
    console.log(db_info.name + " deleted successful !");
  };*/

  var req = window.indexedDB.open(db_info.name, db_info.version);
  req.onsuccess = function() {
    db = req.result;
    console.log("initiated", db);
    ev_initiated.notify(db);
    db.onabort = function() {
      db.close();
      db = null;
    };
  };
  req.onerror = function(e) {
    ev_error.notify(e.target.error.name);
  };
  req.onupgradeneeded = function() {
    for (var i = 0; i < stores.length; i++) {
      var s = stores[i];
      var store = req.result.createObjectStore(
          s.name,
          {keyPath: s.key, autoIncrement: s.increment}
          );
      var indexes = stores[i].index;
      for (var j = 0; j < indexes.length; j++) {
        var index = indexes[j];
        store.createIndex(
          index.name,
          index.key,
          {unique: index.unique}
        );
      }
    }
  };

  /**
   * Retreive an item from a Db Store
   * @param: {string} inItem
   * @param: (string} inStore
   */
  var addItem = function(inItem, inStore) {
    var tx = db.transaction(inStore, "readwrite");
    tx.oncomplete = function() {
    };
    tx.onerror = function(e) {
      ev_error.notify(e.error.name);
    };
    var store = tx.objectStore(inStore);
    var req = store.add(inItem);
    req.onsuccess = function() {
      ev_item_added.notify();
    };
    req.onerror = function() {
      ev_error.notify(req.error.name);
    };
  };

  /**
   * Update an item from a Db Store
   * @param: {string} inItem
   * @param: (string} inStore
   */
  var updateItem = function(inItem, inStore) {
    // console.log("inItem", inItem);
    var tx = db.transaction(inStore, "readwrite");
    var store = tx.objectStore(inStore);
    var req = store.get(inItem.id);
    req.onsuccess = function() {
      var req2 = store.put(inItem);
      req2.onsuccess = function() {
        ev_item_updated.notify();
      };
      req2.onerror = function(e) {
        ev_error.notify(e.error.name);
      };
    };
  };

  /**
   * Remove an item from a Db Store
   * @param: {string} inItem
   * @param: (string} inStore
   */
  var removeItem = function(inItem, inStore) {
    var tx = db.transaction(inStore, "readwrite");
    var store = tx.objectStore(inStore);
    var req = store.delete(inItem.id);
    req.onsuccess = function() {
      ev_item_removed.notify();
    };
    req.onerror = function() {
      ev_error.notify(req.error.name);
    };
  };

  /**
   * Retreive all items from a Db Store
   * @param: {string} inStore
   * @return: {function} callback(items);
   */
  var getAllStore = function(inStore, callback) {
    if (typeof callback === "function") {
      var items = [];
      var tx = db.transaction(inStore);
      var store = tx.objectStore(inStore);
      var req = store.openCursor();
      req.onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        } else {
          callback(items);
        }
      };
      req.onerror = function(e) {
        callback(e.error.name);
      };
    } else {
      console.error("callback should be a function");
    }
  };

  return {
    /* Events */
    initiated:        ev_initiated,
    error:            ev_error,
    item_added:       ev_item_added,
    item_removed:     ev_item_removed,
    item_updated:     ev_item_updated,
    /* Functions */
    addItem:    addItem,
    updateItem:   updateItem,
    removeItem:   removeItem,
    getAllStore:  getAllStore
  };

};
