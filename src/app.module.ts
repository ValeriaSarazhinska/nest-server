import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
