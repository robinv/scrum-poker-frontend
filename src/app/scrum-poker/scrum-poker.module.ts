import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrumPokerComponent } from './scrum-poker.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserListService } from './shared/user-list.service';
import { WebSocketService } from './shared/web-socket.service';

@NgModule({
    declarations: [
        ScrumPokerComponent,
        OverviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        WebSocketService,
        AuthService,
        UserListService
    ],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
