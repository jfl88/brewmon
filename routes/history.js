var express = require('express');
var router = express.Router();

/* GET history page. */
router.get('/history', function(req, res, next) {
  res.render('history', { title: 'Jason\'s Magical Brewing Land - Brew History' });
});

module.exports = router;
