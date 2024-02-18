import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'viewer', 'employee'] }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model('User', userSchema)

export default User
