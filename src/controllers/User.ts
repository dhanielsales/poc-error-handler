import { Router } from 'express'
import { UserUsecase } from '../usecases/User'

export const UserRoutes = Router()

UserRoutes.post('/', async (request, response) => {
  const { name } = request.body

  const user = await UserUsecase.insertOne({ name })

  return response.send(user)
})

UserRoutes.get('/', async (request, response) => {
  const users = await UserUsecase.getAll()

  return response.send(users)
})

UserRoutes.get('/:id', async (request, response) => {
  const { id } = request.params

  const user = await UserUsecase.getById(id)

  return response.send(user)
})

UserRoutes.put('/:id', async (request, response) => {
  const { id } = request.params

  const { name } = request.body

  const user = await UserUsecase.changeOne({ id }, { name })

  return response.send(user)
})

UserRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params

  await UserUsecase.deleteById(id)

  return response.end()
})
