import Task from '../../src/models/task.js'
import Category from '../models/category.js'

export class TaskRepository {
  static async create ({ taskName, taskDueDate, taskPriority, taskStatus, taskCategory, user }) {
    try {
      const task = await Task.findOne({ title: taskName, userId: user })
      if (task) throw new Error('Task already exist')
      const category = await Category.findOne({ category_name: taskCategory, user_id: user })
      if (!category) throw new Error('Category does not exist')
      const newTask = new Task({
        userId: user,
        dueDate: taskDueDate,
        title: taskName,
        category: taskCategory,
        priority: taskPriority,
        status: taskStatus
      })
      await newTask.save()

      return newTask
    } catch (error) {
      console.log(error)
      throw new Error('Error creating task: ' + error.message)
    }
  }

  static async getAll ({ user }) {
    try {
      const tasks = await Task.find({ userId: user })
      return tasks
    } catch (error) {
      throw new Error(error)
    }
  }

  static async update ({ taskName, taskDueDate, taskPriority, taskStatus, taskCategory, user }) {
    try {
      if (!taskName || !user) {
        throw new Error('taskName and userId are required')
      }

      const task = await Task.findOne({ title: taskName, userId: user })

      if (!task) throw new Error(`Task not found for userId: ${user} and taskName: ${taskName}`)

      // dueDate: { type: Date, required: true },
      // title: { type: String, required: true },
      // category: { type: String, required: true },
      // priority: { type: Number, required: true },
      // status: { type: String, required: true }

      if (taskDueDate !== undefined) {
        if (isNaN(new Date(taskDueDate).getTime())) {
          throw new Error('Invalid dueDate format')
        }
        task.dueDate = taskDueDate
      }

      if (taskPriority !== undefined) {
        if (typeof taskPriority !== 'number' || taskPriority < 0) {
          throw new Error('Invalid priority value')
        }
        task.priority = taskPriority
      }
      if (taskStatus !== undefined) task.status = taskStatus
      if (taskCategory !== undefined) {
        const category = await Category.findOne({ category_name: taskCategory, user_id: user })
        if (!category) throw new Error('Category does not exist')
        task.category = taskCategory
      }

      await task.save()

      return task
    } catch (error) {
      console.error('Error in update:', error.message)
      throw error
    }
  }

  static async getById ({ taskName, user }) {
    try {
      const task = await Task.findOne({ title: taskName, userId: user })
      if (!task) throw new Error('Task not found')
      return task
    } catch (error) {

    }
  }
}

export default TaskRepository
