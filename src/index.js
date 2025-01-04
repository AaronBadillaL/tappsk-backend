import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { PORT } from './config.js'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('<h1> Hello </h1>')
})

app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)

app.listen(PORT, () => {
  dbconnect()
})

const dbconnect = () => {
  mongoose.set('strictQuery', true)
  return mongoose.connect('mongodb://127.0.0.1:27017/my_task_db')
    .then(() => {
      console.log('Connection successful')
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err)
    })
}
