import { Observable } from 'rxjs/Observable';

export interface Initializable {
    init(): Observable<any>;
}
