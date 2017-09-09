import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group.model';
import { User } from '../shared/user.model';
import { Bet } from '../shared/bet.model';
import { OwnUser } from '../shared/own-user.model';

@Component({
    selector: 'app-scrum-poker-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

    public group: Group;
    public ownUser: OwnUser;
    public possibleBets: Number[] = [
        1, 2, 3, 5, 8, 13, 20, 30, 40, 100
    ];
    public _lastBet: Number;

    constructor(
        public userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _groupService: GroupService
    ) { }

    public ngOnInit(): void {
        this._route.params.subscribe(params => {
            if (!this.userService.getOwnUser().groupIds.includes(params.id)) {
                this._router.navigate(['/scrum-poker']);
                return;
            }

            this.group = this._groupService.getById(params.id);
            this.ownUser = this.userService.getOwnUser();
        });
    }

    public hasPlacedBet(bets: Array<Bet>, userId: String): Bet {
        return bets.find(bet => {
            return bet.userId === userId;
        });
    }

    public startPoker(): void {
        if (!Object.is(this.userService.getOwnUser().id, this.group.userId)) {
            return;
        }
        this._groupService
            .startPoker(this.group.id)
            .subscribe();
    }

    public endPoker(): void {
        if (!Object.is(this.userService.getOwnUser().id, this.group.userId)) {
            return;
        }
        this._groupService
            .endPoker(this.group.id)
            .subscribe();
    }

    public placeBet(bet: Number): void {
        this._groupService.placeBet(this.group, bet, response => {
            if ('status' in response && response.status == 200) {
                this._lastBet = bet;
            }
        });
    }
}
