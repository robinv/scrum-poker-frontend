import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Resettable } from '../../shared/resettable.interface';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/Subject';
import { Initializable } from '../../shared/initializable.interface';
import { Group } from './group.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/auth.service';
import { OwnUser } from './own-user.model';
import { Bet } from './bet.model';

@Injectable()
export class GroupService implements Resettable, Initializable {

    private _destroySubject = new Subject();
    private _groups: Group[] = [];

    constructor(
        private _webSocketService: WebSocketService,
        private _authService: AuthService,
        private _userService: UserService
    ) {}

    get groups(): Group[] {
        return this._groups;
    }

    public init(): Observable<any> {
        return this._loadGroups()
            .flatMap(this._loadBets)
            .map((groups: Array<Group>) => {
                this._groups = groups;

                this._webSocketService
                    .getObservable('group.created')
                    .takeUntil(this._destroySubject)
                    .subscribe(item => {
                        const existingGroup = this.getById(item.id);
                        if (!existingGroup) {
                            const group: Group = new Group(item.id, item.name, item.userId, item.poker);
                            this._groups.push(group);
                        }
                    });

                this._webSocketService
                    .getObservable('group.poker.started')
                    .takeUntil(this._destroySubject)
                    .subscribe(item => {
                        const group = this.getById(item.id);
                        group.isPokerActive = true;
                        group.bets = [];
                    });

                this._webSocketService
                    .getObservable('group.poker.ended')
                    .takeUntil(this._destroySubject)
                    .subscribe(item => {
                        const group = this.getById(item.id);

                        group.isPokerActive = false;

                        const bets = item.bets.map(data => {
                            const user = this._userService.getById(data.userId);
                            const bet = new Bet(user);
                            bet.bet = data.bet;
                            return bet;
                        });
                        group.bets = bets;
                    });

                this._webSocketService
                    .getObservable('group.poker.betted')
                    .takeUntil(this._destroySubject)
                    .subscribe(item => {
                        const group = this.getById(item.id);
                        const user = this._userService.getById(item.userId);
                        const existingBet = group.bets.find(bet => {
                            return Object.is(bet.user.id, user.id);
                        });
                        if (!existingBet) {
                            const bet = new Bet(user);
                            group.addBet(bet);
                        }
                    });
            });
    }

    public getById(id: String): Group {
        return this._groups.find(group => {
            return Object.is(id, group.id);
        });
    }

    public join(id: String, password: String): Observable<any> {
        return new Observable(observer => {
            this._webSocketService.emit('group.join', {
                id,
                password
            }, response => {
                if (!Object.is(response.status, 200)) {
                    switch (response.status) {
                        case 400:
                            observer.error('invalid password');
                            break;
                        default:
                            observer.error();
                    }
                    observer.complete();
                    return;
                }
                observer.next();
                observer.complete();
            });
        });
    }

    public create(name: String, password: String): Observable<Group> {
        return new Observable(observer => {
            this._webSocketService.emit('group.create', {
                name,
                password
            }, (response) => {
                if (!Object.is(response.status, 200)) {
                    observer.error();
                    observer.complete();
                    return;
                }
                const group = new Group(response.message.id, name, this._authService.userId, false);
                this._userService.getOwnUser().addGroupId(group.id);
                observer.next(group);
                observer.complete();
            });
        });
    }

    public startPoker(id: String): Observable<any> {
        return new Observable(observer => {
            this._webSocketService.emit('group.poker.start', {
                id
            }, (response) => {
                if (!Object.is(response.status, 200)) {
                    observer.error();
                    observer.complete();
                    return;
                }
                observer.next();
                observer.complete();
            });
        });
    }

    public endPoker(id: String): Observable<any> {
        return new Observable(observer => {
            this._webSocketService.emit('group.poker.end', {
                id
            }, (response) => {
                if (!Object.is(response.status, 200)) {
                    observer.error();
                    observer.complete();
                    return;
                }
                observer.next();
                observer.complete();
            });
        });
    }

    private _loadGroups(): Observable<Group[]> {
        return new Observable(observer => {
            this._webSocketService.emit('group.list', {}, result => {
                const groups = result.message.map(item => {
                    return new Group(item.id, item.name, item.userId, item.poker);
                });
                observer.next(groups);
                observer.complete();
            });
        });
    }

    private _loadBets(groups: Group[]): Observable<Group[]> {
        return new Observable(observer => {
            observer.next(groups);
            observer.complete();
        });
    }

    public isUserGroup(user: OwnUser, groupId: String) {
        return user.groupIds.includes(groupId);
    }

    public placeBet(group: Group, bet: Number) {
        this._webSocketService.emit('group.poker.bet', {
            id: group.id,
            bet: bet
        });
    }

    reset(): void {
        this._groups = [];
        this._destroySubject.next();
        this._destroySubject.complete();
        this._destroySubject = new Subject();
    }
}
