import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrumPokerComponent } from './scrum-poker.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserListService } from './shared/user-list.service';
import { WebSocketService } from './shared/web-socket.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdCardModule, MdListModule } from '@angular/material';
import { GroupListService } from './shared/group-list.service';

@NgModule({
    declarations: [
        ScrumPokerComponent,
        OverviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MdCardModule,
        MdListModule
    ],
    providers: [
        WebSocketService,
        AuthService,
        UserListService,
        GroupListService
    ],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
