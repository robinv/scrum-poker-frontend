import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrumPokerComponent } from './scrum-poker.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserCreationService } from './shared/user-creation.service';

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
    providers: [
        UserCreationService
    ],
    bootstrap: [ScrumPokerComponent]
})

export class ScrumPokerModule { }
