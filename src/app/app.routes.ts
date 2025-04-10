import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignsComponent } from './dashboard/campaigns/campaigns.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  {
    path: 'campaigns',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: CampaignsComponent }],
  },
  { path: '', redirectTo: '/campaigns', pathMatch: 'full' },
  { path: '**', redirectTo: '/campaigns' },
];
