import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "@app/modules/explorer/pages/main/main.component";
import {CredentialViewerComponent} from "@app/modules/explorer/pages/credential-viewer/credential-viewer.component";
import {ActivateGuard} from "@app/modules/auth/guards/activate.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'credential-viewer',
    component: CredentialViewerComponent,
    canActivate: [ActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule {
}
