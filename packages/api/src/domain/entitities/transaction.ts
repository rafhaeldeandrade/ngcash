import { UniqueId } from '@/domain/entitities/user'
import { Decimal } from '@prisma/client/runtime'

export type Transaction = {
  id: UniqueId
  debitedAccountId: number
  creditedAccountId: number
  amount: Decimal
}
