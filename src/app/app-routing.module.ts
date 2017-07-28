import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrumPokerComponent } from './scrum-poker/scrum-poker.component';
import { ConnectGuard } from './shared/connect-guard.service';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { LogoutGuard } from './shared/logout.guard';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [LogoutGuard]
    },
    {
        path: 'signup',
        component: UserCreationComponent,
        canActivate: [LogoutGuard]
    },
    {
        path: 'scrum-poker',
        component: ScrumPokerComponent,
        canActivateChild: [ConnectGuard],
        children: [
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
