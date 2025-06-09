import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule('login-mfe', './LoginModule').then(
        (m) => m.LoginModule
      ),
    data: { hideForAuthenticated: true },
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'transfer-money',
    component: TransferMoneyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
