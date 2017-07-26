import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketService } from '../../../shared/web-socket.service';

@Injectable()
export class LoginService {

    constructor(
        private webSocketService: WebSocketService
    ) {}

    public login(name: String, password: String): Observable<String> {
        return new Observable(observer => {
            this.webSocketService.emit(
                'user.join',
                {
                    name,
                    password
                },
                response => {
                    if (!Object.is(response.status, 200)) {
                        observer.error();
                        observer.complete();
                        return;
                    }
                    observer.next(response.message.id);
                    observer.complete();
                }
            );
        });
    }
}
