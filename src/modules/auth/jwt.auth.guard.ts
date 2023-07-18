import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = JwtAuthGuard.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY
      })
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    return type === 'Bearer' ? token : undefined
  }
}
