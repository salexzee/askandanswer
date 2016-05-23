'use strict'

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('We\'re connected!')
})

const questionSchema = mongoose.Schema({
  question: String,
  answer: String,
  answered: Boolean,
  upvotes: Number,
  downvotes: Number,
  qId: Number
})

const Question = mongoose.model('Question', questionSchema)

module.exports = {
  Question: Question
}
