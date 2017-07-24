import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserCreationService } from '../shared/user-creation.service';

@Component({
    selector: 'app-scrum-poker-overview',
    templateUrl: './overview.component.html'
})

export class OverviewComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();

    public users: String[] = [];
    public name: String = '';
    public password: String = '';

    constructor(private userCreationService: UserCreationService) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public createUser() {
        this.subscription.add(
            this.userCreationService
                .create(this.name, this.password)
                .subscribe(response => {
                }, error => {
                })
        );
    }
}
