'use strict'

const express = require('express')
const router = express.Router()
const Question = require('../db/db.js').Question
const dbHelper = require('../db/db_helpers.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ask and Answer' });
});

/* Creates new question and redirects to that question page */
router.post('/post', (req, res, next) => {
  let question = new Question({
    question: req.body.questionInput,
    answer: '',
    answered: false,
    upvotes: 0,
    downvotes: 0,
    qId: dbHelper.randomId()
  })
  console.log(question.question)
  res.render('index')
})

module.exports = router;
