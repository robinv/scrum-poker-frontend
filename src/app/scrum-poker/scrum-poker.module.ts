import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrumPokerComponent } from './scrum-poker.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserService } from './shared/user.service';
import { WebSocketService } from './shared/web-socket.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { GroupService } from './shared/group.service';
import { CreateGroupComponent } from './create-group/create-group.component';
import { JoinGroupDialogComponent } from './overview/join-group-dialog/join-group-dialog.component';
import { GroupComponent } from './group/group.component';

@NgModule({
    declarations: [
        ScrumPokerComponent,
        OverviewComponent,
        CreateGroupComponent,
        JoinGroupDialogComponent,
        GroupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    providers: [
        WebSocketService,
        AuthService,
        UserService,
        GroupService
    ],
    entryComponents: [
        JoinGroupDialogComponent
    ],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
