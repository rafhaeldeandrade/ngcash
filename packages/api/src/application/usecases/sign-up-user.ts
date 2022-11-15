import { UserRepository } from '@/domain/repositories/user-repository'
import {
  SignUpUser,
  SignUpUserInput,
  SignUpUserOutput
} from '@/domain/usecases/sign-up-user'

export class SignUpUserUseCase implements SignUpUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SignUpUserInput): Promise<SignUpUserOutput> {
    const { username } = input
    await this.userRepository.getUserByUsername(username)
    return null as unknown as SignUpUserOutput
  }
}
