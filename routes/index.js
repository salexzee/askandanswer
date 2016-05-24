'use strict'

const express = require('express')
const router = express.Router()
const Question = require('../db/db.js').Question
const dbHelper = require('../db/db_helpers.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Ask and Answer' })
});

/* Creates new question and redirects to that question page */
router.post('/post', (req, res, next) => {
  let question = dbHelper.createQuestion(req.body.questionInput)
  question.save((err, question) => {
    if (err) return console.error(err)
    res.redirect('/question/' + question.id)
  })
})

// Updates the answer for a question on POST /question/:qId/post
router.post('/question/:id/post', (req, res, next) => {
  Question.findOneAndUpdate({
    '_id': req.params.id,
    'answered': false
  }, {
    answer: req.body.answer,
    answered: true
  }, (err, question) => {
    if (err) throw err
    res.redirect('/question/' + question.id)
  })
})

// Renders a specific question on GET /question/:qId
router.get('/question/:id', (req, res, next) => {
  Question.findOne({
    '_id': req.params.id
  }, (err, question) => {
    if (err) throw err
    res.render('question', {
      question: question
    })
  })
})

router.get('/question', (req, res, next) => {
  Question.find({ answered: false }, (err, questions) => {
    if(err) throw err
    if(questions.count > 0) {
      var q = dbHelper.getQuestion(questions)
      res.redirect('/question/' + q.id)
    } else {
      res.render('noquestions')
    }
  })
})

// Renders all questions GET /questions
router.get('/questions', (req, res, next) => {
  Question.find({ answered: true })
    .sort({ upvotes: 1 }).exec((err, questions) => {
    console.log(questions)
    res.render('questions', {
      questions: questions
    })
  })
})

module.exports = router;
