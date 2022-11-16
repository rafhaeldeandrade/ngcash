import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  connect: async () => await prisma.$connect(),
  disconnect: async () => await prisma.$disconnect()
}
