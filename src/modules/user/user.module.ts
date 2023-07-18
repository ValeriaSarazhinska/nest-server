import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService, JwtService],
  exports: [UserService]
})
export class UserModule {}
