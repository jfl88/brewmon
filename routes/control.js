var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};

// db stuff
var dblogin = require('../dblogin.json');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://' + dblogin.user + ':' + dblogin.pw + '@' + dblogin.addr;

/* GET list page. */
router.get('/brewlist', auth, function(req, res, next) {
  MongoClient.connect(url, function(err, db){
    db.collection('brews')
    .find(req.query)
    .sort({ startDT: -1 })
    .toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.dir(docs)
      res.render('brewlist', { title: 'Jason\'s Magical Brewing Land - Control Centre', brews: docs });
    });      
  });
});

router.get('/brew/:brewid', auth, function(req, res, next) {
  MongoClient.connect(url, function(err, db){
    db.collection('brews')
    .find(req.query)
    .sort({ startDT: -1 })
    .toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.dir(docs)
      res.render('brewlist', { title: 'Jason\'s Magical Brewing Land - Control Centre', brews: docs });
    });      
  });
});

module.exports = router;
