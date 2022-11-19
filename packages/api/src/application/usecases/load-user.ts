import { UserRepository } from '@/domain/repositories/user-repository'
import {
  LoadUser,
  LoadUserInput,
  LoadUserOutput
} from '@/domain/usecases/load-user'
import { UserNotFoundError } from '@/application/errors'

export class LoadUserUseCase implements LoadUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(accessToken: LoadUserInput): Promise<LoadUserOutput> {
    const user = await this.userRepository.findUserByAccessToken(accessToken)
    if (!user) throw new UserNotFoundError()
    return {
      id: 1,
      username: 'any_username',
      accountId: 1
    }
  }
}
