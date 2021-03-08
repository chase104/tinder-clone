import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: {
    Data: Buffer,
    ContentType: String
  }
})

export default mongoose.model('cards', cardSchema)
