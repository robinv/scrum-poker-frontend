import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group.model';
import { User } from '../shared/user.model';

@Component({
    selector: 'app-scrum-poker-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})

export class OverviewComponent {

    constructor(
        public userService: UserService,
        public groupService: GroupService
    ) {}

    public getOrderedUsers(items: Array<User>) {
        return items.sort((a, b) => {
            return a.name.toString().localeCompare(b.name.toString());
        });
    }

    public getOrderedGroups(items: Array<Group>) {
        return items.sort((a, b) => {
            if (Object.is(this.isOwnGroup(a.id), this.isOwnGroup(b.id))) {
                return b.name.toString().localeCompare(a.name.toString());
            }
            if (this.isOwnGroup(a.id)) {
                return 1;
            }
            return -1;
        }).reverse();
    }

    public isOwnGroup(groupId: String) {
        const user = this.userService.getOwnUser();
        return this.groupService.isUserGroup(user, groupId);
    }
}
