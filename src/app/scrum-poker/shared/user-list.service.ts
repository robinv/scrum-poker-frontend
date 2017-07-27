import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Resettable } from '../../shared/reset.interface';
import { WebSocketService } from '../../shared/web-socket.service';

@Injectable()
export class UserListService implements Resettable {
    private _users: Set<User> = new Set();

    constructor(private webSocketService: WebSocketService) {
        this._initEventHandling();
    }

    get users(): Set<User> {
        return this._users;
    }

    private _initEventHandling() {
        this.webSocketService
            .getObservable('user.joined')
            .subscribe(item => {
                const user: User = new User(item.id, item.name);
                if (this._users.has(user)) {
                    this._users.add(user);
                }
            });

        this.webSocketService
            .getObservable('user.left')
            .subscribe(item => {
                const user: User = new User(item.id, item.name);
                this._users.delete(user);
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
        this._users.clear();
    }
}
