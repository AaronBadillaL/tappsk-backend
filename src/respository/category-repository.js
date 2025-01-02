import Category from '../models/category.js'
export class CategoryRepository {
  static async create({ categoryName, userId }) {
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

  static async getAll() {
    try {
      const categories = await Category.find()
      return categories
    } catch (error) {
      throw new Error(error)
    }
  }
  static async update({ categoryName, categoryDescription, categoryColor, isActive, userId }) {
    try {
      if (!categoryName || !userId) {
        throw new Error('categoryName and userId are required');
      }

      const category = await Category.findOne({ category_name: categoryName, user_id: userId });

      if (!category) throw new Error(`Category not found for userId: ${userId} and categoryName: ${categoryName}`);

      if (categoryDescription !== undefined) category.description = categoryDescription;
      if (categoryColor !== undefined) category.color = categoryColor;
      if (isActive !== undefined) category.is_active = isActive;

      await category.save();

      return category;
    } catch (error) {
      console.error('Error in update:', error.message);
      throw error;
    }
  }


  static async getById({ categoryName, userId }) {
    try {
      console.log({ categoryName, userId })
      const category = await Category.findOne({ category_name: categoryName, user_id: userId })
      console.log(category)
      if (!category) throw new Error('Category not found')
      return category
    } catch (error) {

    }
  };
}
export default CategoryRepository;
