import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from '../shared/session.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') 
{
    constructor(private readonly session: SessionService)
    {
        super();
    }

    handleRequest(error, isAuthenticated, apiInfo) 
    {

        if (!isAuthenticated)
            throw new UnauthorizedException();

        this.session.setUser(isAuthenticated);
        
        return isAuthenticated;
    }
}