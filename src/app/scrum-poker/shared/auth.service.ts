import * as crypto from 'crypto-js';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { WebSocketService } from '../../shared/web-socket.service';

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

    public getEncryptedPassword(name: String, password: String): String {
        return crypto.SHA256(`${name}${password}`).toString();
    }
}
