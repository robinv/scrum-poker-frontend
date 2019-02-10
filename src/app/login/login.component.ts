import { finalize } from 'rxjs/operators';
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public formError: String;
    public name: String = '';
    public password: String = '';
    public isLoading: Boolean = false;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private authService: AuthService
    ) { }

    public onSubmit(loginForm: ControlContainer): void {
        if (!loginForm.valid) {
            return;
        }
        this.formError = undefined;
        this.isLoading = true;
        this.loginService
            .login(this.name, this.password)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(response => {
                this.authService.token = response;
                this.router.navigate(['scrum-poker']);
            }, error => {
                switch(error) {
                    case 'login invalid':
                        this.formError = 'Wrong name or password. Please try again with the correct login credentials.';
                        break;
                    default:
                        this.formError = 'Unknown error. Please try again.';
                }
            });
    }
}
