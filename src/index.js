import express from 'express'
import mongoose from 'mongoose'
// import cookieParser from 'cookie-parser'
import { PORT } from './config.js'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import taskRoutes from './routes/task.js'

const app = express()

app.use(express.json())
// app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('<h1> Hello </h1>')
})

app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)
app.use('/task', taskRoutes)

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
