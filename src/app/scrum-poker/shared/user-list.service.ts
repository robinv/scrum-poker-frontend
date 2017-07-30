import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Resettable } from '../../shared/resettable.interface';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/Subject';
import { Initializable } from '../../shared/initializable.interface';

@Injectable()
export class UserListService implements Resettable, Initializable {

    private _destroySubject = new Subject();
    private _users: User[] = [];

    constructor(private webSocketService: WebSocketService) {
    }

    get users(): User[] {
        return this._users;
    }

    public init(): void {
        this._loadUsers();
        this.webSocketService
            .getObservable('user.joined')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                const existingUser = this._users.find(user => {
                    return Object.is(item.id, user.id);
                });
                if (!existingUser) {
                    const user: User = new User(item.id, item.name);
                    this._users.push(user);
                }
            });

        this.webSocketService
            .getObservable('user.left')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                this._users = this._users.filter(user => {
                    return !Object.is(item.id, user.id);
                });
            });
    }

    private _loadUsers():void {
        this.webSocketService.emit('user.list', {}, result => {
            this._users = result.message.map(item => {
                return new User(item.id, item.name);
            });
        });
    }

    reset(): void {
        this._users = [];
        this._destroySubject.next();
        this._destroySubject.complete();
        this._destroySubject = new Subject();
    }
}
