import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Resettable } from '../../shared/resettable.interface';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/Subject';
import { Initializable } from '../../shared/initializable.interface';
import { Group } from './group.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/auth.service';
import { OwnUser } from './own-user.model';
import { Bet } from './bet.model';
import { UserService } from './user.service';

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
            .flatMap(groups => {
                return this._loadUsers(groups);
            })
            .flatMap(groups => {
                return this._loadBets(groups);
            })
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
                            const bet = new Bet(data.userId);
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
                        const existingBet = group.bets.find(bet => {
                            return Object.is(bet.userId, item.userId);
                        });
                        if (!existingBet) {
                            const bet = new Bet(item.userId);
                            group.addBet(bet);
                        }
                    });

                this._webSocketService
                    .getObservable('group.joined')
                    .takeUntil(this._destroySubject)
                    .subscribe(item => {
                        const group = this.getById(item.id);
                        group.addUserId(item.userId);
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
            this._webSocketService
                .emit('group.join', {
                    id,
                    password
                })
                .subscribe(result => {
                    if (!Object.is(result.status, 200)) {
                        switch (result.status) {
                            case 400:
                                observer.error('invalid password');
                                break;
                            default:
                                observer.error();
                        }
                        observer.complete();
                        return;
                    }
                    const groupListObservable = this._webSocketService.emit('group.list', {});
                    const groupUsersObservable = this._webSocketService.emit('group.users', {id});
                    const groupBetsObservable = this._webSocketService.emit('group.poker.bets', {id});


                    Observable.forkJoin([groupListObservable, groupUsersObservable, groupBetsObservable])
                        .subscribe(([groupListResult, groupUsersResult, groupBetsResult]) => {
                            const cachedGroup = this.getById(id);

                            groupListResult.message.forEach(groupData => {
                                if (Object.is(id, groupData.id)) {
                                    cachedGroup.isPokerActive = groupData.poker;
                                }
                            });
                            cachedGroup.userIds = groupUsersResult.message;
                            cachedGroup.bets = groupBetsResult.message.map(betData => {
                                const bet = new Bet(betData.userId);
                                if (betData.bet) {
                                    bet.bet = betData.bet;
                                }
                                return bet;
                            });

                            observer.next();
                            observer.complete();
                        });
                });
        });
    }

    public create(name: String, password: String): Observable<Group> {
        return new Observable(observer => {
            this._webSocketService
                .emit('group.create', {
                    name,
                    password
                })
                .subscribe(result => {
                    if (!Object.is(result.status, 200)) {
                        observer.error();
                        observer.complete();
                        return;
                    }
                    const group = new Group(result.message.id, name, this._authService.userId, false);
                    this._userService.getOwnUser().addGroupId(group.id);
                    observer.next(group);
                    observer.complete();
                });
        });
    }

    public startPoker(id: String): Observable<any> {
        return new Observable(observer => {
            this._webSocketService
                .emit('group.poker.start', {
                    id
                })
                .subscribe(result => {
                    if (!Object.is(result.status, 200)) {
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
            this._webSocketService
                .emit('group.poker.end', {
                    id
                })
                .subscribe(result => {
                    if (!Object.is(result.status, 200)) {
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
            this._webSocketService
                .emit('group.list', {})
                .subscribe(result => {
                    const groups = result.message.map(item => {
                        return new Group(item.id, item.name, item.userId, item.poker);
                    });
                    observer.next(groups);
                    observer.complete();
                });
        });
    }

    private _loadUsers(groups: Group[]): Observable<Group[]> {
        return new Observable(observer => {
            const observables = groups
                .map(group => {
                        return this._webSocketService
                            .emit('group.users',{id: group.id})
                            .map(result => {
                                return {
                                    response: result,
                                    group
                                };
                            });
                    }
                );

            if (!observables.length) {
                observer.next(groups);
                observer.complete();
            }

            Observable.forkJoin(observables)
                .subscribe(results => {
                    results.forEach(result => {
                        if (Object.is(result.response.status, 200)) {
                            const userIds = result.response.message;
                            result.group.userIds = userIds;
                        }
                    });
                    observer.next(groups);
                    observer.complete();
                });

        });
    }

    private _loadBets(groups: Group[]): Observable<Group[]> {
        return new Observable(observer => {
            const observables = groups
                .map(group => {
                    return this._webSocketService
                        .emit('group.poker.bets',{id: group.id})
                        .map(result => {
                            return {
                                response: result,
                                group
                            };
                        });
                }
            );

            if (!observables.length) {
                observer.next(groups);
                observer.complete();
            }

            Observable.forkJoin(observables)
                .subscribe(results => {
                    results.forEach(result => {
                        if (Object.is(result.response.status, 200)) {
                            const bets = result.response.message.map(data => {
                                const bet = new Bet(data.userId);
                                if (data.bet) {
                                    bet.bet = data.bet;
                                }
                                return bet;
                            });
                            result.group.bets = bets;
                        }
                    });
                    observer.next(groups);
                    observer.complete();
                });

        });
    }

    public isUserGroup(user: OwnUser, groupId: String) {
        return user.groupIds.includes(groupId);
    }

    public placeBet(group: Group, bet: Number, callback: Function) {
        return this._webSocketService
            .emit('group.poker.bet', {
                id: group.id,
                bet: bet
            })
            .subscribe(response => callback(response));
    }

    reset(): void {
        this._groups = [];
        this._destroySubject.next();
        this._destroySubject.complete();
        this._destroySubject = new Subject();
    }
}
