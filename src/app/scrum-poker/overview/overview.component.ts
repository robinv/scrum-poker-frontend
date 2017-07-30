import { Component } from '@angular/core';
import { UserListService } from '../shared/user-list.service';

@Component({
    selector: 'app-scrum-poker-overview',
    templateUrl: './overview.component.html'
})

export class OverviewComponent {

    constructor(
        public userListService: UserListService
    ) {}
}
