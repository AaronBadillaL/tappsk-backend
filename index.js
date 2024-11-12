import express from 'express'
import { PORT } from './config.js'
import mongoose from 'mongoose'
import { UserRepository } from './respository/user-repository.js'
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1> Hello </h1>')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (error) {
    res.status(401).send(error.message)
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.create({ username, password })
    res.send({ userId: user._id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
app.post('/logout', (req, res) => { })

app.get('/protected', (req, res) => { })

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
