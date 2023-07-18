import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../user/user.schema'

@Module({
  imports: [
    UserModule,
    JwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
