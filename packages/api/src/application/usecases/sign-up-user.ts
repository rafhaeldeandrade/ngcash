import { UserRepository } from '@/domain/repositories/user-repository'
import {
  SignUpUser,
  SignUpUserInput,
  SignUpUserOutput
} from '@/domain/usecases/sign-up-user'
import { UserAlreadyExistsError } from '@/application/errors'

export class SignUpUserUseCase implements SignUpUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SignUpUserInput): Promise<SignUpUserOutput> {
    const { username } = input
    const user = await this.userRepository.getUserByUsername(username)
    if (user) {
      throw new UserAlreadyExistsError(username)
    }
    return null as unknown as SignUpUserOutput
  }
}
