import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectGuard } from './providers/connect-guard.service';
import { DashboardComponent } from './pages/dashboard.component';
import { ConnectComponent } from './pages/connect.component';

const routes: Routes = [
    {
       path: '',
       component: ConnectComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ConnectGuard]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
