import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../shared/group.service';

@Component({
    selector: 'app-scrum-poker-create-group',
    templateUrl: './create-group.component.html'
})
export class CreateGroupComponent {
    public name: String = '';
    public password: String = '';

    constructor(
        private _router: Router,
        private _groupService: GroupService
    ) { }

    public onSubmit(): void {
        this._groupService
            .create(this.name, this.password)
            .subscribe(() => {
                this._router.navigate(['scrum-poker']);
            });
        /*this.loginService
            .login(this.name, this.password)
            .subscribe(response => {
                this.authService.token = response;
                this.router.navigate(['scrum-poker']);
            }, error => {
                console.log({error});
            });
            */
    }
}
