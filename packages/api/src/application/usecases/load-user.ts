import { UserRepository } from '@/domain/repositories/user-repository'
import {
  LoadUser,
  LoadUserInput,
  LoadUserOutput
} from '@/domain/usecases/load-user'
import { UserNotFoundError } from '@/application/errors'
import { Decrypter } from '../contracts'

export class LoadUserUseCase implements LoadUser {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly userRepository: UserRepository
  ) {}

  async execute(accessToken: LoadUserInput): Promise<LoadUserOutput> {
    await this.decrypter.isTokenValid(accessToken)
    const user = await this.userRepository.findUserByAccessToken(accessToken)
    if (!user) throw new UserNotFoundError()
    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId
    }
  }
}
