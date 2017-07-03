var express = require('express');
var router = express.Router();

// db stuff
var dblogin = require('../dblogin.json');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://' + dblogin.user + ':' + dblogin.pw + '@' + dblogin.addr;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jason\'s Magical Brewing Land' });
});

router.route('/api/temps')
  .get(function(req, res, next) {
    MongoClient.connect(url, function(err, db){
      var today = new Date();
      
      db.collection('temps')
      .find({ timestamp: { $gt : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) } })
      .toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs)
        res.json(docs);
      });      
    });
  });

router.route('/api/brews')
  .get(function(req, res, next) {
    MongoClient.connect(url, function(err, db){
      db.collection('brews')
      .find({ complete: false })
      .toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs)
        res.json(docs);
      });      
    });
  });

module.exports = router;
