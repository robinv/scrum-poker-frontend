import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SignupService implements OnDestroy {

    constructor(private http: Http) {}

    public ngOnDestroy(): void {
    }

    public create(name: String, password: String): Observable<String> {
        return this.http
            .post(`${environment.api.protocol}://${environment.api.url}/users`, {
                name,
                password
            })
            .pipe(
                map((response: Response) => {
                    return response.text();
                }),
                catchError((error: Response) => {
                    return Observable.throw(error.text());
                })
            );
    }
}
