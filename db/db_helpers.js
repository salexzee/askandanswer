'use strict'

const Question = require('./db').Question


module.exports.getQuestion = (questions) => {
  let num = 0
  do {
   var q = questions[Math.floor(Math.random() * questions.length)]
   num += 1
 } while(q.question === undefined && num < 10)
  return q
}

module.exports.createQuestion = (question) => {
  return new Question({
    question: question,
    answer: '',
    answered: false,
    upvotes: 0,
    downvotes: 0
  })
}
