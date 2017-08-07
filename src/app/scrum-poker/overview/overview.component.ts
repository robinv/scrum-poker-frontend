import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { GroupService } from '../shared/group.service';

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

    public getOrderedByName(items: Array<any>) {
        return items.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    public isOwnGroup(groupId: String) {
        const user = this.userService.getOwnUser();
        return this.groupService.isUserGroup(user, groupId);
    }
}
