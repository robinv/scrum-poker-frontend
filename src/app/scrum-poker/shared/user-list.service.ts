import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Resettable } from '../../shared/reset.interface';
import { WebSocketService } from '../../shared/web-socket.service';

@Injectable()
export class UserListService implements Resettable {
    private _users: User[] = [];

    constructor(private webSocketService: WebSocketService) {
        this._initEventHandling();
    }

    get users(): User[] {
        return this._users;
    }

    private _initEventHandling() {
        this.webSocketService
            .getObservable('user.joined')
            .subscribe(item => {
                let existingUser = this._users.find(user => {
                    return Object.is(item.id, user.id);
                });
                if (!existingUser) {
                    const user: User = new User(item.id, item.name);
                    this._users.push(user);
                }
            });

        this.webSocketService
            .getObservable('user.left')
            .subscribe(item => {
                this._users = this._users.filter(user => {
                    return !Object.is(item.id, user.id);
                });
            });
    }

    public loadUsers() {
        this.webSocketService.emit('user.list', {}, result => {
            if (!Object.is(result.status, 200)) {
                throw new Error('user list could not be fetched, the user might not be logged in');
            }
            this._users = result.message.map(item => {
                return new User(item.id, item.name);
            });
        });
    }

    reset(): void {
        this._users = [];
    }
}
