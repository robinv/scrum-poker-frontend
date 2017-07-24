import { Injectable, OnDestroy } from '@angular/core';

import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebSocketService implements OnDestroy {
    private socket: SocketIOClient.Socket;
    private observers: Map<String, Observable<any>>;

    constructor() {
        this.socket = io.connect(environment.webSocket.url);
        this.observers = new Map();
    }

    public ngOnDestroy(): void {
        this.socket.disconnect();
    }

    public isConnected(): boolean {
        return this.socket.connected;
    }

    public getObserver(event: string): Observable<any> {
        if (!this.observers.has(event)) {
            return new Observable(observer => {
                this.socket.on(event, (response) => {
                    observer.next(response);
                });
            });
        }
        return this.observers.get(event);
    }

    public emit(event: string, message: any): void {
        this.socket.emit(event, message);
    }
}
