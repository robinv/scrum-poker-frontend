import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-scrum-poker-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public name: String = '';
    public password: String = '';

    constructor(
        private router: Router,
        private loginService: LoginService,
        private authService: AuthService
    ) { }

    public login(): void {
        this.loginService
            .login(this.name, this.password)
            .subscribe(response => {
                this.authService.token = response;
                this.router.navigate(['scrum-poker']);
            }, error => {
                console.log({error});
            });
    }
}
