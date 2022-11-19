import { UserRepository } from '@/domain/repositories/user-repository'
import {
  LoadUser,
  LoadUserInput,
  LoadUserOutput
} from '@/domain/usecases/load-user'

export class LoadUserUseCase implements LoadUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(accessToken: LoadUserInput): Promise<LoadUserOutput> {
    await this.userRepository.findUserByAccessToken(accessToken)
    return {
      id: 1,
      username: 'any_username',
      accountId: 1
    }
  }
}
