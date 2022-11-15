import { UserRepository } from '@/domain/repositories/user-repository'
import {
  SignUpUser,
  SignUpUserInput,
  SignUpUserOutput
} from '@/domain/usecases/sign-up-user'
import { UserAlreadyExistsError } from '@/application/errors'
import { Hasher } from '@/application/contracts'

export class SignUpUserUseCase implements SignUpUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(input: SignUpUserInput): Promise<SignUpUserOutput> {
    const { username, password } = input
    const user = await this.userRepository.getUserByUsername(username)
    if (user) throw new UserAlreadyExistsError(username)
    const hashedPassword = await this.hasher.hash(password)
    await this.userRepository.saveNewUser({
      username,
      password: hashedPassword
    })
    return null as unknown as SignUpUserOutput
  }
}
