import { SALT_ROUNDS } from '../config.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
export class UserRepository {
  static async create ({ username, password }) {
    try {
      Validation.username(username)
      Validation.password(password)
      const user = await User.findOne({ username })
      if (user) throw new Error('User already exists')

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      const newUser = new User({
        username,
        password: hashedPassword
      })
      await newUser.save()

      return newUser
    } catch (error) {
      throw new Error('Error creating user: ' + error.message)
    }
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = await User.findOne({ username })
    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('username does not exist')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 4) throw new Error('Username must be at least 4 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 8) throw new Error('Password must be at least 8 characters long')
  }
}
