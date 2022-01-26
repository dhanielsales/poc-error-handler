import { UserSchema } from "../model/User"
import { UserStore } from "../store/User"

export const UserUsecase = {
  async insertOne(data: Omit<UserSchema, 'id'>): Promise<UserSchema> {
    const user = await UserStore.createOne(data)

    return user
  },

  async getAll(): Promise<UserSchema[]> {
    const users = await UserStore.findAll()

    return users
  },

  async getById(userId: string): Promise<UserSchema> {
    const user = await UserStore.findById(userId)

    return user
  },

  async deleteById(userId: string): Promise<string> {
    const affectedUser = await UserStore.removeById(userId)

    return affectedUser
  },

  async changeOne(where: { id: string }, data: { name: string }): Promise<UserSchema> {
    const user = await UserStore.updateOne(where, data)

    return user
  }
}