import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../providers/web-socket.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();

    public users: String[] = [];
    public name: String = '';
    public password: String = '';

    constructor(private webSocketService: WebSocketService) {}

    ngOnInit(): void {
        this.subscription.add(
            this.webSocketService
                .getObservable('user.create.response')
                .subscribe((response: any) => {
                if (response.status === 200) {
                    this.users.push(response.message.id);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public createUser() {
        this.webSocketService.emit('user.create.request', {
            name: this.name,
            password: this.password
        });
    }
}
