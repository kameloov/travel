import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestDetailsPage } from './request-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RequestDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestDetailsPage),
    TranslateModule.forChild()
  ],
})
export class RequestDetailsPageModule {}
