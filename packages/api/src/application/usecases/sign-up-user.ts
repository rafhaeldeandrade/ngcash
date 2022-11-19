import { UserRepository } from '@/domain/repositories/user-repository'
import {
  SignUpUser,
  SignUpUserInput,
  SignUpUserOutput
} from '@/domain/usecases/sign-up-user'
import { UserAlreadyExistsError } from '@/application/errors'
import { Encrypter, Hasher } from '@/application/contracts'

export class SignUpUserUseCase implements SignUpUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter
  ) {}

  async execute(input: SignUpUserInput): Promise<SignUpUserOutput> {
    const { username, password } = input
    const user = await this.userRepository.findUserByUsername(username)
    if (user) throw new UserAlreadyExistsError(username)
    const hashedPassword = await this.hasher.hash(password)
    const savedUser = await this.userRepository.saveNewUser({
      username,
      password: hashedPassword
    })
    const accessToken = await this.encrypter.encrypt(savedUser.id.toString())
    await this.userRepository.updateAccessToken(savedUser.id, accessToken)
    return {
      id: savedUser.id,
      accessToken
    }
  }
}
