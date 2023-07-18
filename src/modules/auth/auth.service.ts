import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../user/user.schema'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { LoginRequestDto } from './login.request.dto'
import { WrongCredentialsException } from './wrong-credential.exeption'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async loginUser({ name, password }: LoginRequestDto) {
    const user = await this.userService.finedOneByName(name)

    if (!user) {
      throw new WrongCredentialsException()
    }

    await AuthService.validatePassword(password, user.password)

    return await this.issueTokenForUser(user)
  }

  private static async validatePassword(
    password: string,
    hashedPassword: string
  ) {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword)

    if (!isPasswordMatch) {
      throw new WrongCredentialsException()
    }
  }

  private async issueTokenForUser(user: User) {
    return await this.createAuthToken(user)
  }

  private async createAuthToken(user: User) {
    return this.jwtService.sign(
      {
        userId: user._id,
        name: user.name
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRATION_TIME
      }
    )
  }
}
