
import Task from '../../src/models/task.js'

export class TaskRepository {
  static async create({ taskName, taskDescription, taskDueDate, taskPriority, taskStatus, taskCategory, userId }) {
    try {
      const task = await Task.findOne({ task_name: taskName, user_id: userId })
      if (task) throw new Error('Task already exist')
      const newTask = new Task({
        task_name: taskName,
        task_description: taskDescription,
        task_due_date: taskDueDate,
        task_priority: taskPriority,
        task_status: taskStatus,
        task_category: taskCategory,
        user_id: userId
      })
      await newTask.save()

      return newTask
    } catch (error) {
      console.log(error)
      throw new Error('Error creating task: ' + error.message)
    }
  }

  static async getAll({ userId }) {
    try {
      const tasks = await Task.find({ user_id: userId })
      return tasks
    } catch (error) {
      throw new Error(error)
    }
  }

  static async update({ taskName, taskDescription, taskDueDate, taskPriority, taskStatus, taskCategory, userId }) {
    try {
      if (!taskName || !userId) {
        throw new Error('taskName and userId are required');
      }

      const task = await Task.findOne({ task_name: taskName, user_id: userId });

      if (!task) throw new Error(`Task not found for userId: ${userId} and taskName: ${taskName}`);

      if (taskDescription !== undefined) task.description = taskDescription;
      if (taskDueDate !== undefined) task.due_date = taskDueDate;
      if (taskPriority !== undefined) task.priority = taskPriority;
      if (taskStatus !== undefined) task.status = taskStatus;
      if (taskCategory !== undefined) task.category = taskCategory;

      await task.save();

      return task;
    } catch (error) {
      console.error('Error in update:', error.message);
      throw error;
    }
  }

  static async getById({ taskName, userId }) {
    try {
      console.log({ taskName, userId })
      const task = await Task.findOne({ task_name: taskName, user_id: userId })
      console.log(task)
      if (!task) throw new Error('Task not found')
      return task
    } catch (error) {

    }
  }
}

export default TaskRepository;