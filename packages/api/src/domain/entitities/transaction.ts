import { UniqueId } from '@/domain/entitities/user'
import { Decimal } from '@prisma/client/runtime'
import { Account } from './account'

export type Transaction = {
  id: UniqueId
  debitedAccountId?: number
  debitedAccount: {
    id: UniqueId
    user?: {
      id: UniqueId
      username: string
    } | null
  }
  creditedAccountId?: number
  creditedAccount: {
    id: UniqueId
    user?: {
      id: UniqueId
      username: string
    } | null
  }
  amount: Decimal
}
