import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../shared/web-socket.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserCreationService implements OnDestroy {
    private subscription: Subscription = new Subscription();
    private observable: Observable<String>;

    constructor(private webSocketService: WebSocketService) {
        this.observable = new Observable(observer => {
            this.subscription = this.webSocketService
                .getObservable('user.create.response')
                .subscribe(response => {
                    if (!Object.is(response.status, 200)) {
                        console.error(response);
                        return;
                    }
                    observer.next(response.message.id);
                }, error => {
                    console.error(error);
                });
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public create(name: String, password: String): Observable<String> {
        this.webSocketService.emit('user.create.request', {
            name,
            password
        });
        return this.observable;
    }
}
