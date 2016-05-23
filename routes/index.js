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
  let question = new Question({
    question: req.body.questionInput,
    answer: '',
    answered: false,
    upvotes: 0,
    downvotes: 0,
    qId: dbHelper.randomId()
  })

  question.save((err, question) => {
    if (err) return console.error(err)
    console.log(question)
  })

  res.render('index')
})

// Updates the answer for a question on POST /question/:qId/post
router.post('/question/:qId/post', (req, res, next) => {
  let question = Question.findOne({
    'qId': req.params.qId
  })
  if (question.answered === true) {
    res.redirect('/')
    return
  }
})

// Renders a specific question on GET /question/:qId
router.get('/question/:qId', (req, res, next) => {
  let question = Question.findOne({
    'qId': req.params.qId
  })
  res.render('question', {
    question: question
  })
})

// Renders all questions GET /questions
router.get('/questions', (req, res, next) => {
  Question.find({ answered: false })
    .sort({ upvotes: 1 }).exec((err, questions) => {
    console.log(questions)
    res.render('questions', {
      questions: questions
    })
  })
})

module.exports = router;
