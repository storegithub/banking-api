import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../constants';
import { Payload } from 'src/models/credentials.dto';
import { IUserService } from '../userModule/user.service';
import { UserDto } from 'src/models/user.dto';
import { isNullOrUndefined } from 'util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private readonly userService: IUserService;

  constructor(@Inject('IUserService') userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });

    this.userService = userService;
  }

  async validate(payload: Payload): Promise<UserDto> {
    const { userName } = payload;

    const appUser: UserDto = await this.userService.findActiveOne(userName) ;
    if (isNullOrUndefined(appUser))
      throw new UnauthorizedException();

    return appUser;
  }
}