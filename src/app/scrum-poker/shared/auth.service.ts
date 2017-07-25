import { Injectable } from '@angular/core';
import { User } from './user.model';
import { WebSocketService } from '../../shared/web-socket.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private user: User;

    constructor(
        private webSocketService: WebSocketService
    ) {}

    public isLoggedIn(): Boolean {
        if (!this.user) {
            return false;
        }
        return true;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }
}
