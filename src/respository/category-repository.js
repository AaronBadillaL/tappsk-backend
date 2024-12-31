import Category from '../models/caterogy.js'

export class CategoryRepository {
  static async create ({ categoryName, userId }) {
    try {
      const category = await Category.findOne({ category_name: categoryName, user_id: userId })
      if (category) throw new Error('Category already exist')
      const newCategory = new Category({
        category_name: categoryName,
        user_id: userId
      })
      await newCategory.save()

      return newCategory
    } catch (error) {
      console.log(error)
      throw new Error('Error creating user: ' + error.message)
    }
  }

  static async getAll () {
    try {
      const categories = await Category.find()

      return categories
    } catch (error) {
      throw new Error(error)
    }
  }
//   static async update({
//     try {
      
//     } catch (error) {
      
//     }
//   })
}
