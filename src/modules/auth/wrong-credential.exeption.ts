import { HttpException, HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class WrongCredentialsException extends HttpException {
  @ApiProperty()
  message: string

  constructor() {
    super(
      'Log in failed. Name or password is incorrect.',
      HttpStatus.UNAUTHORIZED
    )
  }
}
