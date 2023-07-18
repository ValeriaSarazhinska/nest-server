import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UserService } from './modules/user/user.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const userService = app.get(UserService)
  await userService.seed()
  await app.listen(3000)
}

bootstrap()
