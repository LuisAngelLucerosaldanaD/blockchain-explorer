import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuicklinkStrategy} from "ngx-quicklink";

const routes: Routes = [
  {
    path: "explorer",
    loadChildren: () => import("./modules/explorer/explorer.module").then((m) => m.ExplorerModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)
  },
  {
    path: "payment",
    loadChildren: () => import("./modules/payment-gateway/payment-gateway.module").then((m) => m.PaymentGatewayModule)
  },
  {
    path: '**',
    redirectTo: 'explorer'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      paramsInheritanceStrategy: "always",
      preloadingStrategy: QuicklinkStrategy
    }),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
