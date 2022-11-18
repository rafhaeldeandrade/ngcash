import { UserRepository } from '@/domain/repositories/user-repository'
import {
  Authentication,
  AuthenticationInput,
  AuthenticationOutput
} from '@/domain/usecases/authentication'
import { WrongCredentialsError } from '@/application/errors'

export class AuthenticationUseCase implements Authentication {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AuthenticationInput): Promise<AuthenticationOutput> {
    const user = await this.userRepository.getUserByUsername(input.username)
    if (!user) throw new WrongCredentialsError()
    return {
      accessToken: ''
    }
  }
}
