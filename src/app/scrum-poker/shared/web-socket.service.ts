import 'rxjs/add/operator/takeUntil';

import * as io from 'socket.io-client';

import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebSocketService implements OnDestroy {
    private socket: SocketIOClient.Socket;
    private observables: Map<String, Observable<any>>;

    constructor() {
    }

    public connect(): void {
        this.socket = io.connect(environment.api.url);
        this.observables = new Map();
    }

    public ngOnDestroy(): void {
        if (this.isConnected()) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public isConnected(): boolean {
        return this.socket && this.socket.connected;
    }

    public getObservable(event: string): Observable<any> {
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

    public emit(event: string, message: any, onSuccess?: Function): void {
        this.socket.emit(event, message, function(response) {
            if (onSuccess) {
                onSuccess(response);
            }
        });
    }
}
