/**
 * Created by ruchirangaw on 5/9/17.
 */

const fs = require('fs');
const level = 'DEBUG';
const logDirectoryPath = './logs/';
const logFileName = 'clstest_log.log';

if (!fs.existsSync(logDirectoryPath)) {
  fs.mkdirSync(logDirectoryPath);
}

var cls = require('continuation-local-storage');
var log4js = require('log4js');

var config = {
  "appenders": [
    {
      "type": "logLevelFilter",
      "level": level,
      "appender": {
        "type": "dateFile",
        "filename": logDirectoryPath + logFileName,
        "pattern": "-yyyy-MM-dd",
        "layout": {
          "type": "pattern",
          "pattern": "[%d{DATE}], [%x{correlationId}], [%p], %z %c - %m",
          "tokens": {
            "correlationId" : function() {
              return cls.getNamespace('net.cake.global').get('correlationId');
            }
          }
        }
      }
    },
    {
      "type": "logLevelFilter",
      "level": level,
      "appender": {
        "type": "stdout",
        "layout": {
          "type": "pattern",
          "pattern": "[%d{DATE}], [%x{correlationId}], %[%p%], %z %c - %m",
          "tokens": {
            "correlationId" : function() {
              // var getNamespace = require("continuation-local-storage").getNamespace,
              //   namespace = getNamespace("net.cake.gum");
              return cls.getNamespace('net.cake.global').get('correlationId');
              // return nsp.get("correlationId");
            }
          }
        }
      }
    },
  ]
};

log4js.configure(config);

var logger = log4js.getLogger();

// module.exports = logger;
module.exports = logger;