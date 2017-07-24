import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { ScrumPokerComponent } from './scrum-poker/scrum-poker.component';
import { OverviewComponent } from './scrum-poker/overview/overview.component';
import { ConnectGuard } from './shared/connect-guard.service';
import { UserCreationComponent } from './scrum-poker/user-creation/user-creation.component';
import { LogoutGuard } from './scrum-poker/shared/logout.guard';
import { LoginGuard } from './scrum-poker/shared/login.guard';

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
                path: 'signup',
                component: UserCreationComponent,
                canActivate: [LogoutGuard]
            },
            {
                path: '',
                component: OverviewComponent,
                canActivate: [LoginGuard]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
