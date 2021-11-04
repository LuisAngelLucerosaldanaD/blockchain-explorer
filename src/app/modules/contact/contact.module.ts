import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import {ContactRoutingModule} from "@app/modules/contact/contact-routing.module";
import {UiModule} from "@app/ui/ui.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    UiModule,
    TranslateModule
  ]
})
export class ContactModule { }
