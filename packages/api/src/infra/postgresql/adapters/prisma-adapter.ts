import { DbAdapter } from '@/application/contracts'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export default function (): DbAdapter {
  return {
    initiateDbTransaction: async (queries: any[]) =>
      await prisma.$transaction(queries)
  }
}
