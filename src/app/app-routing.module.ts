import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuicklinkModule, QuicklinkStrategy} from "ngx-quicklink";
const routes:Routes=[
  {
    path:"explorer",
    loadChildren: () => import("./modules/explorer/explorer.module").then((m) =>m.ExplorerModule)
  }
]
@NgModule({
  imports:[
    RouterModule.forRoot(routes,{
      useHash:true,
      scrollPositionRestoration:"enabled",
      paramsInheritanceStrategy: "always",
      preloadingStrategy: QuicklinkStrategy
    }),
    QuicklinkModule
  ],
  exports:[
    RouterModule
  ],
})
export class AppRoutingModule{}
