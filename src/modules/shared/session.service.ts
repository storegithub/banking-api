import { SessionStorage } from "src/models/session.storage";
import { UserDto } from "src/models/user.dto";
import { Injectable, Scope } from "@nestjs/common";


@Injectable({ scope: Scope.REQUEST })
export class SessionService
{
    private readonly storage: SessionStorage = new SessionStorage();

    public setUser(user: UserDto): void
    {
        this.storage.user = user;
    }

    public getUser(): UserDto
    {
        return this.storage.user;
    }
}