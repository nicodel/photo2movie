/* jshint strict: true, devel: true, browser: true */
/* global casper */

casper.test.begin("Photo2Movie - Tests", 1, function suite(test) {
  "use strict";
  test.info("db.js");
  var db_info = {name: "db_test", version: 1};
  var db_stores = [{name: "db_stores_1",
                    key: "id",
                    increment: true,
                    index: [{name: "index_1", key: "key_1", unique: true},
                            {name: "index_2", key: "key_2", unique: true}]
                    }];
  db_test = new DB(db_info, db_stores);



  test.done();
});
