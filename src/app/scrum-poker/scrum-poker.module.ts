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
import {
    MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdProgressSpinnerModule
} from '@angular/material';
import { GroupService } from './shared/group.service';
import { CreateGroupComponent } from './create-group/create-group.component';

@NgModule({
    declarations: [
        ScrumPokerComponent,
        OverviewComponent,
        CreateGroupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MdCardModule,
        MdListModule,
        MdButtonModule,
        MdInputModule,
        MdProgressSpinnerModule
    ],
    providers: [
        WebSocketService,
        AuthService,
        UserListService,
        GroupService
    ],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
