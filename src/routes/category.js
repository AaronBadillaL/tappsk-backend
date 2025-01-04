import express from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../../src/config.js'
import CategoryRepository from '../../src/respository/category-repository.js'

const router = express.Router()

router.post('/addCategory', async (req, res) => {
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

    const { categoryName, userId } = req.body
    const category = await CategoryRepository.create({ categoryName, userId })
    res.send(category)
  } catch (error) {

    console.log(error)
    return res.status(401).send('Sorry')
  }
})

router.get('/getAllCategory', async (req, res) => {
  const token = req.cookies.acccess_token
  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const categories = await CategoryRepository.getAll()
    console.log(categories)
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
  console.log(token)
  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const { categoryName, userId } = req.body
    const category = await CategoryRepository.getById({categoryName, userId})
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
    const { categoryName, categoryDescription, categoryColor, isActive, userId } = req.body
    const categories = await CategoryRepository.update({ categoryName, categoryDescription, categoryColor, isActive, userId })
    res.send(categories)
  } catch (error) {
    console.log(error)
    return res.status(401).send('Sorry, Access not authorized')
  }
})


export default router
