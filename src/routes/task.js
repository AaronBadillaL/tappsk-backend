import express from 'express'
import TaskRepository from '../../src/respository/task-repository.js'

const router = express.Router()

router.post('/addTask', async (req, res) => {
  const token = req.cookies.acces_token
  if (!token) {
    console.log('Token:', token)
    return res.status(403).send('Acess not authorized')
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY) // Reemplaza con tu clave secreta
    console.log('Token decodificado:', decoded)// { iat: 1733674949, exp: 1733678549 }
    const { user } = decoded
    console.log(user)// undefined

    const { taskName, taskDescription, taskDueDate, taskPriority, taskStatus, taskCategory, userId } = req.body
    const task = await TaskRepository.create({ taskName, taskDescription, taskDueDate, taskPriority, taskStatus, taskCategory, userId })
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
    const tasks = await TaskRepository.getAll({userId})
    
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
    const task = await TaskRepository.getById({taskName, userId})
    console.log(task)
    res.send(task)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})


export default router
