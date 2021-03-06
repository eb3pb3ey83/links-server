import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { PasswordException } from 'src/core/exceptions/password.exception'
import { UserException } from 'src/core/exceptions/user.exception'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    const response = await this.authService.validateUser(email, password)
    const isUserError = response === 'user error'
    const isPasswordError = response === 'password error'

    if (isUserError) {
      throw new UserException()
    }

    if (isPasswordError) {
      throw new PasswordException()
    }

    return response
  }
}
