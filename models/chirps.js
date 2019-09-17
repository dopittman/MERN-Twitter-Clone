const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chirpSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    requirede: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Chirp = mongoose.model('chirp', chirpSchema);