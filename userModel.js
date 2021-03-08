import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: {
    Data: Buffer,
    ContentType: String
  }
})

export default mongoose.model('user', userSchema)
