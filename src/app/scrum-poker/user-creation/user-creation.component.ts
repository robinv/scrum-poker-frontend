import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCreationService } from './user-creation.service';

@Component({
    selector: 'app-scrum-poker-user-creation',
    templateUrl: './user-creation.component.html'
})

export class UserCreationComponent implements OnDestroy, OnInit {
    public name: String = '';
    public password: String = '';

    constructor(private userCreationService: UserCreationService) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    public createUser() {
        this.userCreationService
            .create(this.name, this.password)
            .subscribe(userId => {
                console.log(`User Created with ID: ${userId}`);
            });
    }
}
