import { Decimal } from '@prisma/client/runtime'

export type AddTransactionInput = {
  usernameToCashIn: string
  amount: Decimal
  authUserId: number
}

export type AddTransactionOutput = {
  from: string
  to: string
  amountTransacted: Decimal
}

export interface AddTransaction {
  execute(input: AddTransactionInput): Promise<AddTransactionOutput>
}
