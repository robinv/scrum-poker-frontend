import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebSocketService } from './providers/web-socket.service';
import { DashboardComponent } from './pages/dashboard.component';
import { ConnectGuard } from './providers/connect-guard.service';
import { ConnectComponent } from './pages/connect.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ConnectComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [WebSocketService, ConnectGuard],
    bootstrap: [AppComponent]
})

export class AppModule { }
