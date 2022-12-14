import { User } from '@/domain/entitities/user'
import {
  SaveNewUserInput,
  UserRepository
} from '@/domain/repositories/user-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/infra/postgresql/adapters/prisma-adapter'

export default class PostgreSQLUserRepository implements UserRepository {
  async saveNewUser(input: SaveNewUserInput): Promise<User> {
    return prisma.user.create({
      data: {
        username: input.username,
        password: input.password,
        account: {
          create: {
            balance: new Prisma.Decimal(100)
          }
        }
      },
      include: {
        account: {
          select: {
            id: true,
            balance: true
          }
        }
      }
    })
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username
      },
      include: {
        account: {
          select: {
            id: true,
            balance: true
          }
        }
      }
    })
  }

  async updateAccessToken(
    userId: number,
    accessToken: string
  ): Promise<User | null> {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        accessToken
      },
      include: {
        account: {
          select: {
            id: true,
            balance: true
          }
        }
      }
    })
  }

  async findUserByAccessToken(accessToken: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        accessToken
      },
      include: {
        account: {
          select: {
            id: true,
            balance: true
          }
        }
      }
    })
  }

  async findUserById(userId: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        account: {
          select: {
            id: true,
            balance: true
          }
        }
      }
    })
  }
}
