/**
 * Created by ruchirangaw on 5/14/17.
 */
'use strict';

var logger = require('./util/logger');

var cls = require('continuation-local-storage');
var ns = cls.getNamespace('net.cake.global');

var Promise = require("es6-promise").Promise;
require('cls-es6-promise')(ns);

function action(id, callback) {
  return new Promise(function (resolve, reject) {
    setTimeout(function dummywork(){
      logger.info('Id ' + id + ' Preparing to execute callback inside promise');
      var res = callback(id);
      if (res) {
        resolve();
      } else {
        reject();
      }
    }, 500);
  });
}

module.exports = action;
