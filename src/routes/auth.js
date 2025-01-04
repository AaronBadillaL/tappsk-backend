import express from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'
import { UserRepository } from '../respository/user-repository.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { user: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      })
    console.log(token)
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

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.create({ username, password })
    res.send({ userId: user._id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('acces_token').send('Logged out successfully')
})

export default router
