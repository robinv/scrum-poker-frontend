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
import { OwnUser } from './own-user.model';

@Injectable()
export class UserService implements Resettable, Initializable {

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

    public init(): Observable<any> {
        this.reset();
        return this._loadUsers()
            .map((users: Array<User>) => {
                this._users = users;
                this._initListeners();
                return users;
            })
            .flatMap(() => {
                return new Observable(observer => {
                    this._webSocketService
                        .emit('user.groups', {})
                        .subscribe(result => {
                            const ownUser = this.getOwnUser();
                            ownUser.groupIds = result.message;
                            observer.next();
                            observer.complete();
                        });
                });
            });
    }

    private _initListeners() {
        this._webSocketService
            .getObservable('user.joined')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                let user = this.getById(item.id);
                if (user) {
                    user.online = true;
                } else {
                    user = this._createUserObject(item.id, item.name);
                    user.online = true;
                    this._users.push(user);
                }
            });

        this._webSocketService
            .getObservable('user.left')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                const user = this.getById(item.id);
                if (user) {
                    user.online = false;
                } else {
                    this._users.push(this._createUserObject(item.id, item.name));
                }
            });
    }

    private _loadUsers(): Observable<Array<User>> {
        const headers = new Headers();
        headers.set('Authorization', this._authService.token.toString());

        return this._http
            .get(`${environment.api.protocol}://${environment.api.url}/users`, {
                headers: headers
            })
            .flatMap((response: Response) => {
                return new Observable(observer => {
                    const users = response
                        .json()
                        .map(userData => {
                            return this._createUserObject(userData.id, userData.name);
                        });
                    observer.next(users);
                    observer.complete();
                });
            })
            .flatMap((users: Array<User>) => {
                return new Observable(observer => {
                    this._webSocketService
                        .emit('user.list', {})
                        .subscribe(result => {
                            result.message.forEach(item => {
                                const existingUser = users.find(user => {
                                    return Object.is(item.id, user.id);
                                });
                                if (existingUser) {
                                    existingUser.online = true;
                                }
                            });
                            observer.next(users);
                            observer.complete();
                        });
                });
            })
            .catch((error: Response) => {
                return Observable.throw(error.text());
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

    public getOwnUser(): OwnUser {
        return <OwnUser> this._users.find(user => {
            return this.isOwnUser(user);
        });
    }

    public isOwnUser(user: User) {
        return user instanceof OwnUser;
    }

    private _createUserObject(id: String, name: String): User {
        if (Object.is(id, this._authService.userId)) {
            return new OwnUser(id, name);
        }
        return new User(id, name);
    }
}
