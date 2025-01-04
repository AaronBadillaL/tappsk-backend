import mongoose from 'mongoose'

const { Schema, model } = mongoose

const categorySchema = new Schema({
  category_name: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  description: { type: String, default: null },
  color: { type: String, default: '#000000' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
},  
{
  collection: 'categories'// Fuerza el uso de esta colección
})

// Middleware
categorySchema.pre('save', function (next) {
  this.updated_at = Date.now()
  next()
})

const Category = model('Category', categorySchema)

export default Category
