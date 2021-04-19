const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: {
    Data: Buffer,
    ContentType: String
  }
})

module.exports = mongoose.model('cards', cardSchema)
