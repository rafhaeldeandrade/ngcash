import { User } from '@/domain/entitities/user'
import {
  SaveNewUserInput,
  UserRepository
} from '@/domain/repositories/user-repository'
import prismaHelper from './helpers/prisma-helper'

export default class PostgreSQLUserRepository implements UserRepository {
  async saveNewUser(input: SaveNewUserInput): Promise<User> {
    return await prismaHelper.prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          balance: 100
        }
      })

      const user = await tx.user.create({
        data: {
          username: input.username,
          password: input.password,
          accountId: account.id
        }
      })

      return user
    })
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await prismaHelper.prisma.user.findUnique({
      where: {
        username
      }
    })
  }
}