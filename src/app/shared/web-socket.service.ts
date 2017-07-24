import { Injectable, OnDestroy } from '@angular/core';

import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebSocketService implements OnDestroy {
    private socket: SocketIOClient.Socket;
    private observables: Map<String, Observable<any>>;

    constructor() {
        this.socket = io.connect(environment.webSocket.url);
        this.observables = new Map();
    }

    public ngOnDestroy(): void {
        this.socket.disconnect();
    }

    public isConnected(): boolean {
        return this.socket.connected;
    }

    public getObservable(event: string): Observable<any> {
        console.log(event);
        if (!this.observables.has(event)) {
            const observable = new Observable(observer => {
                this.socket.on(event, (response) => {
                    observer.next(response);
                });
            });
            this.observables.set(event, observable);
        }
        return this.observables.get(event);
    }

    public emit(event: string, message: any): void {
        this.socket.emit(event, message);
    }
}
