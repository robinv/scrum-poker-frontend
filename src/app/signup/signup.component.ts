import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnDestroy, OnInit {
    public name: String = '';
    public password: String = '';

    constructor(
        private _signupService: SignupService,
        private _authService: AuthService,
        private _router: Router
    ) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    public onSubmit() {
        this._signupService
            .create(this.name, this.password)
            .subscribe(response => {
                this._authService.token = response;
                this._router.navigate(['scrum-poker']);
            }, error => {
                console.log({error});
            });
    }
}
