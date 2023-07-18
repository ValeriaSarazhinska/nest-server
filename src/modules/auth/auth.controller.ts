import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './login.request.dto'
import { JwtAuthGuard } from './jwt.auth.guard'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginRequestDto) {
    return await this.authService.loginUser(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  getHello(): string {
    return 'Hello'
  }
}
