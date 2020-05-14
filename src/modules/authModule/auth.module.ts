import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller"; 
import { UserModule } from "../userModule/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { JwtStrategy } from './jwtStrategy.service';


@Module({
    imports: [
        UserModule, 
        PassportModule.register({ defaultStrategy:  jwtConstants.defaultStrategy}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn }
        })
    ],
    controllers: [ AuthController ],
    providers: [ { provide: "IAuthService", useClass: AuthService }, JwtStrategy ],
    exports: [ PassportModule, JwtStrategy, { provide: "IAuthService", useClass: AuthService } ]
})
export class AuthModule{}