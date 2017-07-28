import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCreationService } from './user-creation.service';
import { User } from '../scrum-poker/shared/user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-scrum-poker-user-creation',
    templateUrl: './user-creation.component.html'
})

export class UserCreationComponent implements OnDestroy, OnInit {
    public name: String = '';
    public password: String = '';

    constructor(
        private userCreationService: UserCreationService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    public createUser() {
        this.userCreationService
            .create(
                this.name,
                this.password
            )
            .subscribe(userId => {
                const user: User = new User(userId, this.name);
                this.authService.user = user;
                this.router.navigate(['scrum-poker']);
            });
    }
}
