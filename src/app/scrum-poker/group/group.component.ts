import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group.model';
import { OwnUser } from '../shared/own-user.model';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-scrum-poker-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

    public group: Group;
    public ownUser: OwnUser;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _router: Router,
        private _groupService: GroupService,
        private _snackBar: MdSnackBar
    ) { }

    public ngOnInit(): void {
        this._route.params.subscribe(params => {
            if (!this._userService.getOwnUser().groupIds.includes(params.id)) {
                this._router.navigate(['/scrum-poker']);
                return;
            }

            this.group = this._groupService.getById(params.id);
            this.ownUser = this._userService.getOwnUser();
        });
    }

    public startPoker(): void {
        if (!Object.is(this._userService.getOwnUser().id, this.group.userId)) {
            return;
        }
        this._groupService
            .startPoker(this.group.id)
            .subscribe(() => {
                this._snackBar.open('Scrum Poker started', null, {
                    duration: 2000
                });
            });
    }

    public endPoker(): void {
        if (!Object.is(this._userService.getOwnUser().id, this.group.userId)) {
            return;
        }
        this._groupService
            .endPoker(this.group.id)
            .subscribe(() => {
                this._snackBar.open('Scrum Poker ended', null, {
                    duration: 2000
                });
            });
    }
}
