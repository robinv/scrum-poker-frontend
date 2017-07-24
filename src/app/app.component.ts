import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './shared/web-socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    messages: String[] = [];

    constructor(
        public webSocketService: WebSocketService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.webSocketService.getObservable('disconnect').subscribe(() => {
            this.router.navigate(['']);
        });

        this.webSocketService.getObservable('connect').subscribe(() => {
            this.router.navigate(['scrum-poker']);
        });
    }
}
