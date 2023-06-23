import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BlockComponent} from "@app/modules/view-credentials/pages/block/block.component";
const routes:Routes=[
  {
    path: "block",
    component: BlockComponent
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
export class ViewCredentialsRoutingModule{}
