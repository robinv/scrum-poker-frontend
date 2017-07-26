import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketService } from '../../../shared/web-socket.service';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class LoginService {

    constructor(
        private webSocketService: WebSocketService,
        private authService: AuthService
    ) {}

    public login(name: String, password: String): Observable<String> {
        return new Observable(observer => {
            this.webSocketService.emit(
                'user.join',
                {
                    name,
                    password: this.authService.getEncryptedPassword(name, password)
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
