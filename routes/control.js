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
      db.close();
    });      
  });
});

/* GET Show brew details for edit */
router.get('/brew/:brewid', auth, function(req, res, next) {
  console.log(req.params.brewid);
  MongoClient.connect(url, function(err, db){
    db.collection('brews')
    .findOne({ "_id": ObjectId(req.params.brewid)}, function(err, doc) {
      assert.equal(err, null);
      res.render('editbrew', { title: 'Jason\'s Magical Brewing Land - Brewing Control Centre', brew: doc });
      db.close();
    });      
  });
});

/* POST Handle update data */
router.post('/brew/:brewid', auth, function(req, res, next) {
  console.log(req.body);
  brewUpdate = { $set: {
      name: req.body.name,
      recipeUrl: req.body.recipeUrl,
      complete: (req.body.complete === 'on'),
      startDT: req.body.startDT,
      finishDT: req.body.finishDT
    } 
  } 

  MongoClient.connect(url, function(err, db){
    db.collection('brews')
    .findOneAndUpdate({ "_id": ObjectId(req.params.brewid)}, brewUpdate, { returnOriginal: false }, function(err, r){
      assert.equal(null, err);

      res.render('editbrew', { title: 'Jason\'s Magical Brewing Land - Brewing Control Centre', brew: r.value, update: true });
      db.close();
    });
  });
});

module.exports = router;
