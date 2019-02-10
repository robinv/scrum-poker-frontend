import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

    constructor(
        private http: Http
    ) {}

    public login(name: String, password: String): Observable<String> {
        return this.http
            .post(`${environment.api.protocol}://${environment.api.url}/tokens`, {
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
