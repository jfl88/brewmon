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

router.route('/api/brews')
  .get(function(req, res, next) {
    MongoClient.connect(url, function(err, db){
      db.collection('brews')
      .find(req.query)
      .toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs)
        res.json(docs);
      });      
    });
  });

module.exports = router;
