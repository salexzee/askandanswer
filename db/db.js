const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re connected!')
});

const questionSchema = mongoose.Schema({
  question: String,
  answer: {
    text: String,
    upvotes: Number,
    downvotes: Number
  },
  answered: Boolean
})

const Question = mongoose.model('Question', questionSchema)

module.exports = {
  Question: Question
}
