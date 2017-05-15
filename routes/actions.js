'use strict';

var express = require('express');
var action = require('../promise-actions');
var cls = require('continuation-local-storage');
var ns = cls.getNamespace('net.cake.global');
var logger = require('../util/logger');

var router = express.Router();

router.get('/:id', function (req, res) {
  var id = req.params.id;

  action(id, function(id) {
    setTimeout(function dummywork(){
      logger.info('Id ' + id + ' Executing timeout callback dummy work');
    }, 500);
    return true;
  }).then(function () {
    logger.info('Id ' + id + ' Executing then');
    res.send('Id ' + id + " request served successfully for correlationId : " + ns.get('correlationId'));
    // res.redirect('redirect/' + id);
  }, function () {
    logger.info('Id ' + id + 'Executing error');
  });
});

router.get('/redirect/:id', function (req, res) {
  var id = req.params.id;
  var correlationId = ns.get('correlationId');
  var msg = 'Redirect success for id ' + id + 'with correlation id ' + correlationId;
  logger.info(msg);
  res.send(msg);
});

module.exports = router;
