import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketService } from '../../../shared/web-socket.service';

@Injectable()
export class LoginService {

    constructor(
        private webSocketService: WebSocketService
    ) {}

    public login(id: String, password: String): Observable<any> {
        return new Observable(observer => {
            this.webSocketService.emit(
                'user.join',
                {
                    id,
                    password
                },
                response => {
                    if (!Object.is(response.status, 200)) {
                        observer.error();
                        observer.complete();
                        return;
                    }
                    observer.next(true);
                    observer.complete();
                }
            );
        });
    }
}
