import { Observable } from 'rxjs';

export interface Initializable {
    init(): Observable<any>;
}
