import 'rxjs/add/operator/takeUntil';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCreationService } from './user-creation.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-scrum-poker-user-creation',
    templateUrl: './user-creation.component.html'
})

export class UserCreationComponent implements OnDestroy, OnInit {
    private ngUnSubscribe: Subject<void> = new Subject<void>();
    public name: String = '';
    public password: String = '';

    constructor(private userCreationService: UserCreationService) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.ngUnSubscribe.next();
        this.ngUnSubscribe.complete();
    }

    public createUser() {
            this.ngUnSubscribe = new Subject<void>();
            this.userCreationService
                .create(this.name, this.password)
                .takeUntil(this.ngUnSubscribe)
                .subscribe(userId => {
                    console.log(`User Created with ID: ${userId}`);
                    this.ngUnSubscribe.next();
                    this.ngUnSubscribe.complete();
                });
    }
}
