import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrumPokerComponent } from './scrum-poker.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserCreationService } from './user-creation/user-creation.service';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { LoginGuard } from './shared/login.guard';
import { LogoutGuard } from './shared/logout.guard';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login/login.component';
import { LoginService } from './login/login/login.service';

@NgModule({
    declarations: [
        ScrumPokerComponent,
        OverviewComponent,
        UserCreationComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        UserCreationService,
        AuthService,
        LoginService,
        LoginGuard,
        LogoutGuard
    ],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
