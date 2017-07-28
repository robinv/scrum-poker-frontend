import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectGuard } from './shared/connect-guard.service';
import { ConnectComponent } from './connect/connect.component';
import { ScrumPokerModule } from './scrum-poker/scrum-poker.module';
import { LoginComponent } from './login/login/login.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { LoginGuard } from './shared/login.guard';
import { LogoutGuard } from './shared/logout.guard';
import { LoginService } from './login/login/login.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ConnectComponent,
        UserCreationComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ScrumPokerModule,
        FormsModule
    ],
    providers: [
        ConnectGuard,
        LoginGuard,
        LogoutGuard,
        LoginService,
        UserCreationComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
