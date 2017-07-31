import 'rxjs/add/operator/finally';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../shared/group.service';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: 'app-scrum-poker-create-group',
    templateUrl: './create-group.component.html'
})
export class CreateGroupComponent {
    public isLoading: Boolean = false;
    public formError: String;
    public name: String = '';
    public password: String = '';

    constructor(
        private _router: Router,
        private _groupService: GroupService
    ) { }

    public onSubmit(createGroupForm: ControlContainer): void {
        if (!createGroupForm.valid) {
            return;
        }

        this._groupService
            .create(this.name, this.password)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(() => {
                this._router.navigate(['scrum-poker']);
            }, error => {
                switch(error) {
                    default:
                        this.formError = 'Unknown error. Please try again.';
                }
            });
    }
}
