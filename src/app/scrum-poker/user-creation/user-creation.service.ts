import 'rxjs/add/operator/takeUntil';

import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../shared/web-socket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserCreationService implements OnDestroy {
    private ngUnSubscribe: Subject<void> = new Subject<void>();
    private observable: Observable<String>;

    constructor(private webSocketService: WebSocketService) {
        this.observable = new Observable(observer => {
            this.webSocketService
                .getObservable('user.create.response')
                .takeUntil(this.ngUnSubscribe)
                .subscribe(response => {
                    if (!Object.is(response.status, 200)) {
                        observer.error(response.message);
                        return;
                    }
                    observer.next(response.message.id);
                }, error => {
                    console.error(error);
                });
        });
    }

    public ngOnDestroy(): void {
        this.ngUnSubscribe.next();
        this.ngUnSubscribe.complete();
    }

    public create(name: String, password: String): Observable<String> {
        this.webSocketService.emit('user.create.request', {
            name,
            password
        });
        return this.observable;
    }
}
