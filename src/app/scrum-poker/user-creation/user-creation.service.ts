import 'rxjs/add/operator/takeUntil';

import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../shared/web-socket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserCreationService implements OnDestroy {
    private ngUnSubscribe: Subject<void> = new Subject<void>();

    constructor(private webSocketService: WebSocketService) {}

    public ngOnDestroy(): void {
        this.ngUnSubscribe.next();
        this.ngUnSubscribe.complete();
    }

    public create(name: String, password: String): Observable<String> {
        return new Observable(observer => {
            this.webSocketService.emit('user.create', {
                name,
                password
            }, response => {
                if (!Object.is(response.status, 200)) {
                    observer.error(response.message);
                    observer.complete();
                    return;
                }
                observer.next(response.message.id);
                observer.complete();
            });
        });
    }
}
