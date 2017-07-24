import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './pages/connect.component';
import { ScrumPokerComponent } from './scrum-poker/scrum-poker.component';
import { OverviewComponent } from './scrum-poker/pages/overview.component';
import { ConnectGuard } from './providers/connect-guard.service';

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
