import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectComponent } from './connect/connect.component';
import { ScrumPokerModule } from './scrum-poker/scrum-poker.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from './shared/login.guard';
import { LogoutGuard } from './shared/logout.guard';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { SignupService } from './signup/signup.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdMenuModule, MdToolbarModule } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        ConnectComponent,
        SignupComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ScrumPokerModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdInputModule,
        MdMenuModule,
        MdToolbarModule
    ],
    providers: [
        LoginGuard,
        LogoutGuard,
        LoginService,
        SignupService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
