import { UserRepository } from '@/domain/repositories/user-repository'
import {
  Authentication,
  AuthenticationInput,
  AuthenticationOutput
} from '@/domain/usecases/authentication'
import { WrongCredentialsError } from '@/application/errors'
import { HashComparer } from '@/application/contracts'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async execute(input: AuthenticationInput): Promise<AuthenticationOutput> {
    const user = await this.userRepository.getUserByUsername(input.username)
    if (!user) throw new WrongCredentialsError()
    await this.hashComparer.compare(input.password, user.password)
    return {
      accessToken: ''
    }
  }
}
