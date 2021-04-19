const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: {
    Data: Buffer,
    ContentType: String
  }
})

module.exports = mongoose.model('user', userSchema)
