import { Account } from '@/domain/entitities/account'

export interface AccountRepository {
  getAccountById(id: number): Promise<Account | null>
}
