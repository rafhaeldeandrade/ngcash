import { UserRepository } from '@/domain/repositories/user-repository'
import {
  Authentication,
  AuthenticationInput,
  AuthenticationOutput
} from '@/domain/usecases/authentication'

export class AuthenticationUseCase implements Authentication {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AuthenticationInput): Promise<AuthenticationOutput> {
    await this.userRepository.getUserByUsername(input.username)
    return {
      accessToken: ''
    }
  }
}
