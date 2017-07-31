import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(
       public authService: AuthService,
       private _router: Router
    ) {}

    public ngOnInit(): void {

    }

    public logout(): void {
        this.authService.reset();
        this._router.navigate(['']);
    }
}
