import { UserRepository } from '@/domain/repositories/user-repository'
import { Login, LoginInput, LoginOutput } from '@/domain/usecases/login'
import { WrongCredentialsError } from '@/application/errors'
import { Encrypter, HashComparer } from '@/application/contracts'

export class LoginUseCase implements Login {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findUserByUsername(input.username)
    if (!user) throw new WrongCredentialsError()
    const passwordMatches = await this.hashComparer.compare(
      input.password,
      user.password
    )
    if (!passwordMatches) throw new WrongCredentialsError()
    const newAccessToken = await this.encrypter.encrypt(user.id.toString())
    await this.userRepository.updateAccessToken(user.id, newAccessToken)
    return {
      accessToken: newAccessToken
    }
  }
}
