var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ask and Answer' });
});

router.get('/questions', (req, res, next) => {
  res.render('questions', {title: 'Questoins'})
})

module.exports = router;
