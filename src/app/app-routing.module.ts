import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuicklinkModule, QuicklinkStrategy} from "ngx-quicklink";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 /* {
    path: 'home',
    loadChildren: ()=> import('@app/modules/home/home.module').then((m) => m.HomeModule)
  },*/
  {
    path: 'explorer',
    loadChildren: () => import('@app/modules/explorer/explorer.module').then((m) => m.ExplorerModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@app/modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@app/modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('@app/modules/contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: '**',
    redirectTo: 'explorer'
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: QuicklinkStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
