'use strict'

const mongoose = require('mongoose')

const dbUrl = process.env.MONGOLAB_URL || 'mongodb://localhost/questions'

mongoose.connect(process.env.MONGOLAB_URL)
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
  downvotes: Number
})

const Question = mongoose.model('Question', questionSchema)

module.exports = {
  Question: Question
}
