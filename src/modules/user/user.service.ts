import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.schema'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async finedOneByName(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name }).exec()
  }

  async seed(): Promise<void> {
    const userExists = await this.userModel.findOne({ name: 'username' })
    if (!userExists) {
      const password = await bcrypt.hash('password', 10)
      await this.userModel.create({
        name: 'username',
        password
      })
    }
  }
}
