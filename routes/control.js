var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');

// db stuff
var dblogin = require('../dblogin.json');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var url = 'mongodb://' + dblogin.user + ':' + dblogin.pw + '@' + dblogin.addr;

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  console.log(dblogin);
  console.log(user);
  
  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === dblogin.control_login && user.pass === dblogin.control_password) {
    return next();
  } else {
    return unauthorized(res);
  };
};

/* GET list page. */
router.get('/brewlist', auth, function(req, res, next) {
  MongoClient.connect(url, function(err, db){
    db.collection('brews')
    .find(req.query)
    .sort({ startDT: -1 })
    .toArray(function(err, docs) {
      assert.equal(err, null);
      res.render('brewlist', { title: 'Jason\'s Magical Brewing Land - Brewing Control Centre', brews: docs });
    });      
  });
});

router.get('/brew/:brewid', auth, function(req, res, next) {
  console.log(req.params.brewid);
  MongoClient.connect(url, function(err, db){
    db.collection('brews')
    .findOne({ "_id": ObjectId(req.params.brewid)}, function(err, doc) {
      assert.equal(err, null);
      res.render('editbrew', { title: 'Jason\'s Magical Brewing Land - Brewing Control Centre', brew: doc });
    });      
  });
});

router.post('/brew/:brewid', auth, function(req, res, next) {
  console.log(req.body);
  res.send('Post page');
});

module.exports = router;
