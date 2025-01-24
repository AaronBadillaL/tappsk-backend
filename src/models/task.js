import mongoose from 'mongoose'

const { Schema, model } = mongoose

const taskSchema = new Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: Number, required: true },
  status: { type: String, required: true }

})

const Task = model('Task', taskSchema)

export default Task
