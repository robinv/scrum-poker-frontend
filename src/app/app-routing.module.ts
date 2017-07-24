import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { ScrumPokerComponent } from './scrum-poker/scrum-poker.component';
import { OverviewComponent } from './scrum-poker/overview/overview.component';
import { ConnectGuard } from './shared/connect-guard.service';

const routes: Routes = [
    {
       path: '',
       component: ConnectComponent
    },
    {
        path: 'scrum-poker',
        component: ScrumPokerComponent,
        canActivateChild: [ConnectGuard],
        children: [
            {
                path: '',
                component: OverviewComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
