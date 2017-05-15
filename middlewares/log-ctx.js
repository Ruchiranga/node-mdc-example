'use strict';

var cls = require('continuation-local-storage');

var logContext = cls.createNamespace('net.cake.global');

module.exports = function (req, res, next) {
  logContext.bindEmitter(req);
  logContext.bindEmitter(res);

  var correlationId = req.header("X-Correlation-Id");

  logContext.run(function () {
    logContext.set('correlationId', correlationId);
    next();
  });
};
