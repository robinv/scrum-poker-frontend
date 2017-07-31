import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';

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
            .map((response: Response) => {
                return response.text();
            })
            .catch((error: Response) => {
                return Observable.throw(error.text());
            });
    }
}
