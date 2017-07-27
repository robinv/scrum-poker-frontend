import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

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
            .subscribe(userId => {
                const user: User = new User(userId, this.name);
                this.authService.user = user;
                this.router.navigate(['scrum-poker']);
            });
    }
}
