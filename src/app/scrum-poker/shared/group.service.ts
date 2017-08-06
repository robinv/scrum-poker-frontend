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

@Injectable()
export class GroupService implements Resettable, Initializable {

    private _destroySubject = new Subject();
    private _groups: Group[] = [];

    constructor(
        private _webSocketService: WebSocketService,
        private _authService: AuthService
    ) {}

    get groups(): Group[] {
        return this._groups;
    }

    public init(): Observable<any> {
        return this._loadGroups()
            .map((groups: Array<Group>) => {
                this._groups = groups;

                this._webSocketService
                    .getObservable('group.created')
                    .takeUntil(this._destroySubject)
                    .subscribe(item => {
                        const existingGroup = this.getById(item.id);
                        if (!existingGroup) {
                            const group: Group = new Group(item.id, item.name, item.userId);
                            this._groups.push(group);
                        }
                    });
            });
    }

    public getById(id: String): Group {
        return this._groups.find(group => {
            return Object.is(id, group.id);
        });
    }

    public create(name: String, password: String): Observable<Group>{
        return new Observable(observer => {
            this._webSocketService.emit('group.create', {
                name,
                password
            }, (response) => {
                const group = new Group(response.message.id, name, this._authService.userId);
                observer.next(group);
                observer.complete();
            });
        });
    }

    private _loadGroups(): Observable<Array<Group>> {
        return new Observable(observer => {
            this._webSocketService.emit('group.list', {}, result => {
                const groups = result.message.map(item => {
                    return new Group(item.id, item.name, item.userId);
                });
                observer.next(groups);
                observer.complete();
            });
        });
    }

    reset(): void {
        this._groups = [];
        this._destroySubject.next();
        this._destroySubject.complete();
        this._destroySubject = new Subject();
    }
}
