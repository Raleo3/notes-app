var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// Either....this needs to spit out angular JS bundle into index.html somehow...
// OR...this is the home route, and we can serve angular and express on two diff.  ports..


module.exports = router;
