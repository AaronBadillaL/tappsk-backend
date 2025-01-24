import express from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../../src/config.js'
import CategoryRepository from '../../src/respository/category-repository.js'

const router = express.Router()

router.post('/addCategory', async (req, res) => {
  const token = req.cookies.acces_token

  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)

    const currentTimestamp = Math.floor(Date.now() / 1000) // Fecha actual en segundos
    if (decoded.exp < currentTimestamp) {
      console.log('El token ha expirado') // TODO: Test
      return res.status(401).send('Access not authorized')
    }
    const { user } = decoded
    const { categoryName } = req.body

    const category = await CategoryRepository.create({ categoryName, user })
    res.send(category)
  } catch (error) {
    console.error('Error al verificar el token:', error.message)
    return res.status(401).send('Invalid token')
  }
})

router.get('/getAllCategory', async (req, res) => {
  const token = req.cookies.acces_token

  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)

    const currentTimestamp = Math.floor(Date.now() / 1000) // Fecha actual en segundos
    if (decoded.exp < currentTimestamp) {
      console.log('El token ha expirado') // TODO: Test
      return res.status(401).send('Access not authorized')
    }

    const { user } = decoded

    const categories = await CategoryRepository.getAll(user)
    const filteredCategories = categories.map(category => ({
      _id: category._id,
      category_name: category.category_name,
      color: category.color,
      description: category.description,
      is_active: category.is_active
    }))
    res.send(filteredCategories)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})

router.get('/getByIdCategory', async (req, res) => {
  const token = req.cookies.acccess_token

  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)

    const currentTimestamp = Math.floor(Date.now() / 1000) // Fecha actual en segundos
    if (decoded.exp < currentTimestamp) {
      console.log('El token ha expirado') // TODO: Test
      return res.status(401).send('Access not authorized')
    }

    const { user } = decoded
    const { categoryName } = req.body
    const category = await CategoryRepository.getById({ categoryName, user })
    console.log(category)
    res.send(category)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})

router.put('/updateCategory', async (req, res) => {
  const token = req.cookies.acccess_token

  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY)

    const currentTimestamp = Math.floor(Date.now() / 1000) // Fecha actual en segundos
    if (decoded.exp < currentTimestamp) {
      console.log('El token ha expirado') // TODO: Test
      return res.status(401).send('Access not authorized')
    }

    const { user } = decoded
    const { categoryName, categoryDescription, categoryColor, isActive } = req.body
    const categories = await CategoryRepository.update({ categoryName, categoryDescription, categoryColor, isActive, user })
    res.send(categories)
  } catch (error) {
    return res.status(401).send('Sorry, Access not authorized')
  }
})

export default router
