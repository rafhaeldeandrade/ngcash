import { UniqueId, User } from '@/domain/entitities/user'
import { Decimal } from '@prisma/client/runtime'

export type Account = {
  id: UniqueId
  balance: Decimal
  user?: User | null
}
