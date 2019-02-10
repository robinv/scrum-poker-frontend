import { finalize } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnDestroy, OnInit {
    public isLoading: Boolean = false;
    public formError: String;
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

    public onSubmit(signupForm: ControlContainer) {
        if (!signupForm.valid) {
            return;
        }

        this.isLoading = true;
        this._signupService
            .create(this.name, this.password)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(response => {
                this._authService.token = response;
                this._router.navigate(['scrum-poker']);
            }, error => {
                switch(error) {
                    case 'name already exists':
                        this.formError = 'This name is already taken. Please choose another one.';
                        break;
                    default:
                        this.formError = 'Unknown error. Please try again.';
                }
            });
    }
}
