import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRequestPage } from './add-request';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRequestPage),
    TranslateModule.forChild()
  ],
})
export class AddRequestPageModule {}
