/*jshint browser: true, strict: true, devel: true */
/* exported Event */

function Event(sender) {
  "use strict";
  this._sender = sender;
  this._listeners = [];
}

Event.prototype = {
  attach: function (listener) {
    "use strict";
    this._listeners.push(listener);
  },
  notify: function (args) {
    "use strict";
    var index;
    for (index = 0; index < this._listeners.length; index += 1) {
      this._listeners[index](this._sender, args);
    }
  }
};
