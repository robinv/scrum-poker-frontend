import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Resettable } from '../../shared/resettable.interface';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/Subject';
import { Initializable } from '../../shared/initializable.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class UserListService implements Resettable, Initializable {

    private _destroySubject = new Subject();
    private _users: User[] = [];

    constructor(
        private _webSocketService: WebSocketService,
        private _authService: AuthService,
        private _http: Http
    ) {}

    get users(): User[] {
        return this._users;
    }

    public init(): void {
        this._loadUsers();
        this._webSocketService
            .getObservable('user.joined')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                const user = this.getById(item.id);
                if (user) {
                    user.online = true;
                }
            });

        this._webSocketService
            .getObservable('user.left')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                const user = this.getById(item.id);
                if (user) {
                    user.online = false;
                }
            });
    }

    private _loadUsers(): void {
        const headers = new Headers();
        headers.set('Authorization', this._authService.token.toString());

        this._http
            .get(`${environment.api.protocol}://${environment.api.url}/users`, {
                headers: headers
            })
            .map((response: Response) => {
                const users = response.json();
                return users.map(userData => {
                    return new User(userData.id, userData.name);
                });
            })
            .catch((error: Response) => {
                return Observable.throw(error.text());
            })
            .subscribe(users => {
                users.forEach(user => {
                    this.users.push(user);
                });

                this._webSocketService.emit('user.list', {}, result => {
                    result.message.forEach(item => {
                        const user = this.getById(item.id);
                        if (user) {
                            user.online = true;
                        }
                    });
                });
            });
    }

    public getById(id: String): User {
        return this._users.find(user => {
            return Object.is(id, user.id);
        });
    }

    public getOnlineUsers(): User[] {
        return this._users.filter(user => {
            return user.online;
        });
    }

    public getOfflineUsers(): User[] {
        return this._users.filter(user => {
            return !user.online;
        });
    }

    public reset(): void {
        this._users = [];
        this._destroySubject.next();
        this._destroySubject.complete();
        this._destroySubject = new Subject();
    }
}
