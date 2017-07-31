import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Resettable } from '../../shared/resettable.interface';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/Subject';
import { Initializable } from '../../shared/initializable.interface';
import { Group } from './group.model';
import { UserListService } from './user-list.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class GroupService implements Resettable, Initializable {

    private _destroySubject = new Subject();
    private _groups: Group[] = [];

    constructor(
        private _webSocketService: WebSocketService,
        private _userListService: UserListService,
        private _authService: AuthService
    ) {}

    get groups(): Group[] {
        return this._groups;
    }

    public init(): void {
        this._loadGroups();
        this._webSocketService
            .getObservable('group.created')
            .takeUntil(this._destroySubject)
            .subscribe(item => {
                const existingGroup = this.getById(item.id);
                if (!existingGroup) {
                    const owner = this._userListService.getById(item.userId);
                    const group: Group = new Group(item.id, item.name, owner);
                    this._groups.push(group);
                }
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
                const owner = this._userListService.getById(this._authService.userId);
                const group = new Group(response.message.id, name, owner);
                observer.next(group);
            });
        });
    }

    private _loadGroups():void {
        this._webSocketService.emit('group.list', {}, result => {
            this._groups = result.message.map(item => {
                const owner = this._userListService.getById(item.userId);
                return new Group(item.id, item.name, owner);
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