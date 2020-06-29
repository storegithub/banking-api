import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });

    this.userService = userService;
  }

  async validate(payload: any, done: VerifiedCallback) {
    const { userName } = payload.user;

    const appUser: UserDto = await this.userService.findActiveOne(userName) ;
    if (isNullOrUndefined(appUser))
    return done(
      new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
      false,
    );
  

    return done(null, appUser, payload.iat);
  }
}