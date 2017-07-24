import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebSocketService } from './shared/web-socket.service';
import { ConnectGuard } from './shared/connect-guard.service';
import { ConnectComponent } from './connect/connect.component';
import { ScrumPokerModule } from './scrum-poker/scrum-poker.module';

@NgModule({
    declarations: [
        AppComponent,
        ConnectComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ScrumPokerModule
    ],
    providers: [
        WebSocketService,
        ConnectGuard
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
