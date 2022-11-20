import { UniqueId } from '@/domain/entitities/user'
import { Decimal } from '@prisma/client/runtime'

export type Account = {
  id: UniqueId
  balance: Decimal
}
