import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrumPokerComponent } from './scrum-poker/scrum-poker.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutGuard } from './shared/logout.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './shared/login.guard';
import { OverviewComponent } from './scrum-poker/overview/overview.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [LogoutGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [LogoutGuard]
    },
    {
        path: 'scrum-poker',
        component: ScrumPokerComponent,
        canActivateChild: [LoginGuard],
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
