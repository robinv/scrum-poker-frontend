import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ScrumPokerComponent } from './scrum-poker.component';
import { OverviewComponent } from './pages/overview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WebSocketService } from '../providers/web-socket.service';

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
    providers: [WebSocketService],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
