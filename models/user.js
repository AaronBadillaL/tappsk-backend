import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

// Exporting the schema as a model
const User = model('User', userSchema)

export default User
