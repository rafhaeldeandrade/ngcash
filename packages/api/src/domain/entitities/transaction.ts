import { UniqueId } from '@/domain/entitities/user'
import { Decimal } from '@prisma/client/runtime'
import { Account } from './account'

export type Transaction = {
  id: UniqueId
  debitedAccountId: number
  debitedAccount?: Account
  creditedAccountId: number
  creditedAccount?: Account
  amount: Decimal
}
