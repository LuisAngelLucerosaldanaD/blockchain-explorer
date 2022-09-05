import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuicklinkModule, QuicklinkStrategy} from "ngx-quicklink";
import {ExplorerComponent} from "./explorer.component";
import { DataViewerComponent } from "./pages/data-viewer/data-viewer.component";
import { DownloadAppComponent } from "@app/modules/explorer/pages/download-app/download-app.component";
const routes:Routes=[
  {
    path:"",
    component:ExplorerComponent
  },
  {
    path:"data-viewer",
    component:DataViewerComponent
  },
  {
    path:"download-app",
    component:DownloadAppComponent
  }
]
@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})
export class ExplorerRoutingModule{}
