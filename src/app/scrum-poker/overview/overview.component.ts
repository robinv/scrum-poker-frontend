import { Component } from '@angular/core';
import { UserListService } from '../shared/user-list.service';
import { GroupService } from '../shared/group.service';

@Component({
    selector: 'app-scrum-poker-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})

export class OverviewComponent {

    constructor(
        public userListService: UserListService,
        public groupService: GroupService
    ) {}

    public getOrderedByName(items: Array<any>) {
        return items.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }
}
