import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-scrum-poker-user-creation',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnDestroy, OnInit {
    public name: String = '';
    public password: String = '';

    constructor(
        private signupService: SignupService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    public createUser() {
        this.signupService
            .create(this.name, this.password)
            .subscribe(response => {
                this.authService.token = response;
                this.router.navigate(['scrum-poker']);
            }, error => {
                console.log({error});
            });
    }
}
