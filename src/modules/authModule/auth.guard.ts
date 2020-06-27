import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') 
{

    handleRequest(error, isAuthenticated, apiInfo) 
    {

        if (!isAuthenticated)
            throw new UnauthorizedException();

        console.log(error);
        console.log(isAuthenticated);
        console.log(apiInfo);
        

        return isAuthenticated;
    }
}