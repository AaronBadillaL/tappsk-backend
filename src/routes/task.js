import express from 'express'
import TaskRepository from '../../src/respository/task-repository.js'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'
const router = express.Router()

router.post('/addTask', async (req, res) => {
  const token = req.cookies.acces_token

  if (!token) {
    return res.status(403).send('Access not authorized')
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)

    const currentTimestamp = Math.floor(Date.now() / 1000)
    if (decoded.exp < currentTimestamp) {
      console.log('El token ha expirado')
      return res.status(401).send('Access not authorized')
    }
    const { user } = decoded

    const { taskName, taskDueDate, taskPriority, taskStatus, taskCategory } = req.body
    const task = await TaskRepository.create({ taskName, taskDueDate, taskPriority, taskStatus, taskCategory, user })
    res.send(task)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry')
  }
})

router.get('/getAllTask', async (req, res) => {
  const token = req.cookies.acccess_token
  console.log(token)
  if (!token) {
    return res.status(403).send('Access not authorized')
  }
  const { userId } = req.body
  try {
    const tasks = await TaskRepository.getAll({ userId })
    res.send(tasks)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})

router.get('/getByIdTask', async (req, res) => {
  const token = req.cookies.acccess_token
  console.log(token)
  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const { taskName, userId } = req.body
    const task = await TaskRepository.getById({ taskName, userId })
    console.log(task)
    res.send(task)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})

router.patch('/updateTask', async (req, res) => {
  const token = req.cookies.acccess_token
  console.log(token)
  if (!token) {
    return res.status(403).send('Access not authorized')
  }
  const decoded = jwt.verify(token, SECRET_JWT_KEY)

  const currentTimestamp = Math.floor(Date.now() / 1000)
  if (decoded.exp < currentTimestamp) {
    console.log('El token ha expirado')
    return res.status(401).send('Access not authorized')
  }
  const { user } = decoded
  try {
    const { taskName, taskDueDate, taskPriority, taskStatus, taskCategory } = req.body
    const task = await TaskRepository.update({ taskName, taskDueDate, taskPriority, taskStatus, taskCategory, user })
    console.log(task)
    res.send(task)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})

export default router
