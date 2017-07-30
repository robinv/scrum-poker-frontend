import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Resettable } from '../../shared/resettable.interface';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/Subject';
import { Initializable } from '../../shared/initializable.interface';
import { Group } from './group.model';
import { UserListService } from './user-list.service';

@Injectable()
export class GroupListService implements Resettable, Initializable {

    private _destroySubject = new Subject();
    private _groups: Group[] = [];

    constructor(
        private _webSocketService: WebSocketService,
        private _userListService: UserListService
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
