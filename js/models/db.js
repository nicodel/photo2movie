"use strict;"
var DB = function() {
  window.indexedDB = window.shimIndexedDB  && window.shimIndexedDB.__useShim();

  var DB_NAME = "p2m";
  var DB_VERSION = 1; // Use a long long for this value (don't use a float)
  var DB_STORE_ANIMATIONS = "animations";
  var DB_STORE_SETTINGS = "settings";

  var DEFAULT_CONFIG = [
    {"key":"language", "value":"none"},
    {"key":"interval", "value":"none"}
  ];

  function initiate(successCallback, errorCallback) {
    if (typeof(successCallback) === "function") {
      // DB.reset_app(DB_NAME);
      var req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = function(e) {
        // console.log("DB created successfully: ", req.result);
        db = req.result;
        successCallback(req.result);
        db.onabort = function(e) {
          db.close();
          db = null;
        };
      };
      req.onerror = function(e) {
        console.error("error on initiate DB: ", e.target.error.name);
        errorCallback(e.target.error.name);
        g_error = true;
      };
      req.onupgradeneeded = function(event) {
        //
        // Create animations store as:
        //
        var store = req.result.createObjectStore(DB_STORE_ANIMATIONS, {keyPath:"id", autoIncrement: true});
        store.createIndex("animaid", "animaid", {unique: true});

        //
        // Create settings store as:
        //
        var store = req.result.createObjectStore(DB_STORE_SETTINGS, {keyPath: "key"});
        store.createIndex("key", "key", {unique: true});
        store.createIndex("value", "value", {unique: false});
      };
    } else  {
      errorCallback("initiate() successCallback should be a function");
    }
  }
  function addAnimation(successCallback, errorCallback, inAnimation) {
    if (typeof successCallback === "function") {

      var tx = db.transaction(DB_STORE_ANIMATIONS, "readwrite");
      tx.oncomplete = function(e) {
        // console.log("addAnimation transaction completed !");
      };
      tx.onerror = function(e) {
        // console.error("addAnimation transaction error: ", tx.error.name);
        errorCallback(e.error.name);
      };
      var store = tx.objectStore(DB_STORE_ANIMATIONS);
      var req = store.add(inAnimation);
      req.onsuccess = function(e) {
        // console.log("addAnimation store store.add successful");
        successCallback(inAnimation.name);
        // ??? going back to home ???
      };
      req.onerror = function(e) {
        // console.error("addAnimation store store.add error: ", req.error.name);
        errorCallback(req.error.name);
      };
    } else  {
      errorCallback("addAnimation successCallback should be a function");
    }
  }
  function getAnimations(successCallback, errorCallback) {
    if (typeof successCallback === "function") {
      var all_animations = [];
      var tx = db.transaction("animations");
      var store = tx.objectStore("animations");
      var req = store.openCursor();
      req.onsuccess = function(e) {
        var cursor = e.target.result;
        // console.log("getAnimations store.openCursor successful !", cursor);
        if (cursor) {
          // console.log("cursor.value", cursor.value);
          all_animations.push(cursor.value);
          cursor.continue();
        } else{
          // console.log("got all animations: ", all_animations);
          successCallback(all_animations);
        }
      };
      req.onerror = function(e) {console.error("getAnimations store.openCursor error: ", e.error.name);};
    } else {
      errorCallback("getAnimations successCallback should be a function");
    }
  }
  function reset_app() {
    var req = window.indexedDB.deleteDatabase(DB_NAME);
    req.onerror = function(e) {
      console("reset error: ", e.error.name);
    };
    req.onsuccess = function(e) {
      console.log(DB_NAME + " deleted successful !");
    };
  }
  function deleteAnimation(successCallback, errorCallback, inAnimation) {
    if (typeof successCallback === "function") {
      var tx = db.transaction(DB_STORE_ANIMATIONS, "readwrite");
      tx.oncomplete = function(e) {
        console.log("deleteAnimation transaction completed !");
      };
      tx.onerror = function(e) {
        console.error("deleteAnimation transaction error: ", tx.error.name);
        errorCallback(x.error.name);
      };
      var store = tx.objectStore(DB_STORE_ANIMATIONS);
      var req = store.delete(inAnimation.id);
      req.onsuccess = function(e) {
        console.log("deleteAnimation store store.delete successful");
        successCallback(inAnimation.name);
      };
      req.onerror = function(e) {
        console.error("deleteAnimation store store.delete error: ", req.error.name);
        errorCallback(req.error.name);
      };
    } else  {
      errorCallback("deleteAnimation successCallback should be a function");
    }
  }
  function getConfig(successCallback, errorCallback) {
    if (typeof successCallback === "function") {
      var settings = [];
      var tx = db.transaction(DB_STORE_SETTINGS);
      var store = tx.objectStore(DB_STORE_SETTINGS);
      var req = store.openCursor();
      req.onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
          settings.push(cursor.value);
          cursor.continue();
        } else {
          if (settings.length === 0) {
            console.log("no config found, loading the default one !")
            settings = DEFAULT_CONFIG;
            __saveDefaultConfig();
          };
          var prettySettings = {};
          for (var i = 0; i < settings.length; i++) {
            prettySettings[settings[i].key] = settings[i].value;
          };
          console.log("loaded settings are:", prettySettings);
          successCallback(prettySettings);
        }
      };
      req.onerror = function(e) {console.error("getConfig store.openCursor error: ", e.error.name);};
    } else {
      errorCallback("getConfig() successCallback should be a function");
    }
  }
  // function saveMap(successCallback, errorCallback, inAnimation) {
  //   if (typeof successCallback === "function") {
  //     var tx = db.transaction(DB_STORE_ANIMATIONS, "readwrite");
  //     var store = tx.objectStore(DB_STORE_ANIMATIONS);
  //     var req = store.get(inAnimation.id);
  //     req.onsuccess = function(e) {
  //       var req2 = store.put(inAnimation);
  //       req2.onsuccess = function(e) {
  //         console.log("successfully updated");
  //       }
  //       req2.onerror = function(e) {
  //         console.log("failure on saving map");
  //         errorCallback(e.error.name);
  //       }
  //     }
  //   } else  {
  //     errorCallback("addTrack successCallback should be a function");
  //   }
  // }
  function updateAnimation(successCallback, errorCallback, inAnimation) {
    if (typeof successCallback === "function") {
      var tx = db.transaction(DB_STORE_ANIMATIONS, "readwrite");
      var store = tx.objectStore(DB_STORE_ANIMATIONS);
      var req = store.get(inAnimation.id);
      req.onsuccess = function(e) {
        var req2 = store.put(inAnimation);
        req2.onsuccess = function(e) {
          console.log("successfully updated");
          successCallback();
        }
        req2.onerror = function(e) {
          console.log("failure on updating");
          errorCallback(e.error.name);
        }
      }
    } else  {
      errorCallback("updateAnimation successCallback should be a function");
    }
  }
  function __saveDefaultConfig() {
    console.log("saving default config");
    var tx = db.transaction(DB_STORE_SETTINGS, "readwrite");
    tx.oncomplete = function(e) {
      // console.log("successful creating default config !");
    };
    tx.onerror = function(e) {
      // console.error("default config transaction error: ", tx.error.name);
      errorCallback(x.error.name);
    };
    var store = tx.objectStore([DB_STORE_SETTINGS]);
    for (var i = 0; i < DEFAULT_CONFIG.length; i++) {
      var req = store.add(DEFAULT_CONFIG[i]);
      req.onsuccess = function(e) {
        // console.log("added: ", e.target.result);
      };
      req.onerror = function(e) {
        // console.error("error: ", req.error.name);
      };
    };
  }

  function updateConfig(successCallback, errorCallback, inKey, inValue) {
    if (typeof successCallback === "function") {
      var tx = db.transaction(DB_STORE_SETTINGS, "readwrite");
      var store = tx.objectStore(DB_STORE_SETTINGS);
      var req = store.get(inKey);
      console.log("req", req);
      req.onsuccess = function(e) {
        req.result.value = inValue;
        console.log("req.result", req.result);
        var req2 = store.put(req.result);
        console.log("req2", req2);
        req2.onsuccess = function(e) {
          console.log("successfully updated");
          successCallback();
        }
        req2.onerror = function(e) {
          errorCallback(e.error.name);
        }
      }
      req.onerror = function(e) {
        errorCallback(e.error.name);
      }
    } else  {
      errorCallback("updateConfig successCallback should be a function");
    }
  }

  return {
    initiate: initiate,
    addAnimation: addAnimation,
    getAnimations: getAnimations,
    deleteAnimation: deleteAnimation,
    reset_app: reset_app,
    getConfig: getConfig,
    updateConfig: updateConfig,
    // saveMap: saveMap,
    updateAnimation: updateAnimation
  };
}();