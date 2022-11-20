import { Decimal } from '@prisma/client/runtime'

export type UniqueId = number

export type User = {
  id: UniqueId
  username: string
  password: string
  accountId: UniqueId
  accessToken: string | null
  account: {
    id: UniqueId
    balance: Decimal
  }
}
