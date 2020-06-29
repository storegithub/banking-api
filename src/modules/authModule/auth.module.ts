import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../userModule/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { JwtStrategy } from './jwtStrategy.service';
import { SharedModule } from "../shared/shared.module";


@Module({
    imports: [
        UserModule, 
        PassportModule.register({ defaultStrategy:  jwtConstants.defaultStrategy}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn }
        }),
        SharedModule
    ], 
    providers: [ { provide: "IAuthService", useClass: AuthService }, JwtStrategy ],
    exports: [ PassportModule, JwtStrategy, { provide: "IAuthService", useClass: AuthService } ]
})
export class AuthModule{}