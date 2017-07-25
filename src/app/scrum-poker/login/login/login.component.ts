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
    public id: String = '';
    public password: String = '';

    constructor(
        private router: Router,
        private loginService: LoginService,
        private authService: AuthService
    ) { }

    public login(): void {
        this.loginService
            .login(this.id, this.password)
            .subscribe(isLoggedIn => {
                if (isLoggedIn) {
                    const user: User = new User(this.id, this.id);
                    this.authService.setUser(user);
                    this.router.navigate(['scrum-poker']);
                }
            })
    }
}
