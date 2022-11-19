import { UserRepository } from '@/domain/repositories/user-repository'
import {
  LoadUser,
  LoadUserInput,
  LoadUserOutput
} from '@/domain/usecases/load-user'
import {
  InvalidTokenError,
  UserNotAuthorizedError,
  UserNotFoundError
} from '@/application/errors'
import { Decrypter } from '../contracts'

export class LoadUserUseCase implements LoadUser {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly userRepository: UserRepository
  ) {}

  async execute(accessToken: LoadUserInput): Promise<LoadUserOutput> {
    const decodedToken = await this.decrypter.decrypt(accessToken)
    if (!decodedToken) throw new InvalidTokenError()
    const user = await this.userRepository.findUserByAccessToken(accessToken)
    if (!user) throw new UserNotFoundError()
    if (user.id !== Number(decodedToken)) throw new UserNotAuthorizedError()
    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId
    }
  }
}
