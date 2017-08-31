import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group.model';
import { User } from '../shared/user.model';
import { MdDialog } from '@angular/material';
import { JoinGroupDialogComponent } from './join-group-dialog/join-group-dialog.component';

@Component({
    selector: 'app-scrum-poker-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})

export class OverviewComponent {

    constructor(
        public userService: UserService,
        public groupService: GroupService,
        private _dialog: MdDialog
    ) {}

    public getOrderedUsers(items: Array<User>) {
        return items.sort((a, b) => {
            return a.name.toString().localeCompare(b.name.toString());
        });
    }

    public getJoinedGroups(items: Array<Group>) {
        return items.filter(group => {
            if (this.isJoinedGroup(group.id)) {
                return group;
            }
        });
    }

    public getUnjoinedGroups(items: Array<Group>) {
        return items.filter(group => {
            if (!this.isJoinedGroup(group.id)) {
                return group;
            }
        });
    }

    public getOrderedGroups(items: Array<Group>) {
        return items.sort((a, b) => {
            if (Object.is(this.isJoinedGroup(a.id), this.isJoinedGroup(b.id))) {
                return b.name.toString().localeCompare(a.name.toString());
            }
            if (this.isJoinedGroup(a.id)) {
                return 1;
            }
            return -1;
        }).reverse();
    }

    public isJoinedGroup(groupId: String) {
        const user = this.userService.getOwnUser();
        return this.groupService.isUserGroup(user, groupId);
    }

    public joinGroup(group: Group) {
        if (this.isJoinedGroup(group.id)) {
            return ;
        }
        this._dialog.open(JoinGroupDialogComponent, {
            data: {
                groupId: group.id,
                groupName: group.name
            }
        });

    }
}
