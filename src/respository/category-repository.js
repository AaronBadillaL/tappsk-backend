import Category from '../models/category.js'
export class CategoryRepository {
  static async create ({ categoryName, user }) {
    try {
      const category = await Category.findOne({ category_name: categoryName, user_id: user })
      if (category) throw new Error('Category already exist')
      const newCategory = new Category({
        category_name: categoryName,
        user_id: user
      })
      await newCategory.save()

      return newCategory
    } catch (error) {
      console.log(error)
      throw new Error('Error creating user: ' + error.message)
    }
  }

  static async getAll (user) {
    try {
      const categories = await Category.find({ user_id: user })
      return categories
    } catch (error) {
      throw new Error(error)
    }
  }

  static async update ({ categoryName, categoryDescription, categoryColor, isActive, user }) {
    try {
      if (!categoryName || !user) {
        throw new Error('categoryName and user are required')
      }

      const category = await Category.findOne({ category_name: categoryName, user_id: user })

      if (!category) throw new Error(`Category not found for userId: ${user} and categoryName: ${categoryName}`)

      if (categoryDescription !== undefined) category.description = categoryDescription
      if (categoryColor !== undefined) category.color = categoryColor
      if (isActive !== undefined) category.is_active = isActive

      await category.save()

      return category
    } catch (error) {
      console.error('Error in update:', error.message)
      throw error
    }
  }

  static async getById ({ categoryName, user }) {
    try {
      console.log({ categoryName, user })
      const category = await Category.findOne({ category_name: categoryName, user_id: user })
      if (!category) throw new Error('Category not found')
      return category
    } catch (error) {

    }
  };
}
export default CategoryRepository
