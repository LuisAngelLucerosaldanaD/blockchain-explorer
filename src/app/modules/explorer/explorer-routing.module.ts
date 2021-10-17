import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "@app/modules/explorer/pages/main/main.component";
import {CredentialViewerComponent} from "@app/modules/explorer/pages/credential-viewer/credential-viewer.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'credential-viewer',
    component: CredentialViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule {
}
