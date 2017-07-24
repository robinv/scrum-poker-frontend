import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebSocketService } from './providers/web-socket.service';
import { ConnectGuard } from './providers/connect-guard.service';
import { ConnectComponent } from './pages/connect.component';
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
    providers: [WebSocketService, ConnectGuard],
    bootstrap: [AppComponent]
})

export class AppModule { }
