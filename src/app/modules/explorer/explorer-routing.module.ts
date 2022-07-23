import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuicklinkModule, QuicklinkStrategy} from "ngx-quicklink";
import {ExplorerComponent} from "./explorer.component";
import { DataViewerComponent } from "./pages/data-viewer/data-viewer.component";
const routes:Routes=[
  {
    path:"",
    component:ExplorerComponent
  },
  {
    path:"data-viewer",
    component:DataViewerComponent
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
