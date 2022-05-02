import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard_tab',
        loadChildren: () => import('../01_Dashboard_Tab/Dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'info_tab',
        loadChildren: () => import('../02_Info_Tab/Info.module').then(m => m.InfoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard_tab',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
