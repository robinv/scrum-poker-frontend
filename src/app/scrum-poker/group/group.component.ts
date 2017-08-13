import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group.model';

@Component({
    selector: 'app-scrum-poker-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

    public group: Group;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _router: Router,
        private _groupService: GroupService
    ) { }

    public ngOnInit(): void {
        this._route.params.subscribe(params => {
            if (!this._userService.getOwnUser().groupIds.includes(params.id)) {
                this._router.navigate(['/scrum-poker']);
                return;
            }

            this.group = this._groupService.getById(params.id);
        });
    }
}
