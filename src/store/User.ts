import { UserSchema } from "../model/User"
import AppError from "../utils/AppError"

let dbData = [
  { id: '1', name: 'Murilo' },
  { id: '2', name: 'Dhaniel' },
  { id: '3', name: 'Iago' },
]

const fakedDb = {
  create: async (data: Omit<UserSchema, 'id'>) => new Promise<UserSchema>((resolve) => {
    const lastId = Math.max.apply(Math, dbData.map((value) => Number(value.id)))

    const newUser: UserSchema = {
      id: String(lastId + 1),
      ...data
    }

    dbData.push(newUser)

    resolve(newUser)
  }),


  find: async (userId?: string)  => new Promise<UserSchema | UserSchema[]>((resolve) => {
    if (!userId) {
      resolve(dbData)
    } else {
      const finded = dbData.find(({ id }) => id === userId)
      resolve(finded as UserSchema)
    }
  }),

  remove: async (userId: string)  => new Promise<string>((resolve) => {
    const finded = dbData.find(({ id }) => id === userId)

    if (finded) {
      dbData = dbData.filter(({ id }) => id !== userId)
    }

    resolve(finded?.id as string)
  }),
  
  update: async (where: { id: string }, data: Omit<UserSchema, 'id'>)  => new Promise<UserSchema>((resolve) => {
    let finded = dbData.find(({ id }) => id === where.id)

    if (finded) {
      dbData.forEach((value, index) => {
        if (value.id === where.id) {
          dbData[index] = {...value, name: data.name}
          finded = dbData[index]
        }
      })
    }

    resolve(finded as UserSchema)
}),
}


export const UserStore = {
  async findAll(): Promise<UserSchema[]> {
    const users = await fakedDb.find() as UserSchema[]

    return users
  },

  async findById(id: string): Promise<UserSchema> {
    const user = await fakedDb.find(id) as UserSchema

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  },

  async removeById(id: string): Promise<string> {
    const affected = await fakedDb.remove(id)

    if (!affected) {
      throw new AppError('User not found', 404)
    }

    return affected
  },

  async updateOne(where: { id: string }, data: Omit<UserSchema, 'id'>): Promise<UserSchema> {
    const updatedUser = await fakedDb.update(where, data)

    if (!updatedUser) {
      throw new AppError('User not found', 404)
    }

    return updatedUser
  },

  async createOne(data: Omit<UserSchema, 'id'>): Promise<UserSchema> {
    const updatedUser = await fakedDb.create(data)

    if (!updatedUser) {
      throw new AppError('User not found', 404)
    }

    return updatedUser
  }
}
