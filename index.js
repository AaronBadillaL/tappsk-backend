import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './respository/user-repository.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('<h1> Hello </h1>')
})

app.post('/login', async (req, res) => {
  console.log('Im here')
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { user: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      })
    res
      .cookie('acces_token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .send({ user, token })
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

app.get('/addCategory', (req, res) => {
  const token = req.cookies.acccess_token
  console.log(token)
  if (!token) {
    return res.status(403).send('Acess not authorized')
  }
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    console.log(data)
    res.send('Adding Category...')
  } catch (error) {
    return res.status(401).send('Acess not authorized')
  }
})

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
